package com.example.service;

import com.example.config.GeminiConfig;
import com.example.model.AnalysisResponse;
import com.example.model.SymptomRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.*;

@Service
public class GeminiService {

    private final RestTemplate restTemplate;
    private final GeminiConfig geminiConfig;
    private final ObjectMapper objectMapper;

    @Autowired
    public GeminiService(RestTemplate restTemplate, GeminiConfig geminiConfig) {
        this.restTemplate = restTemplate;
        this.geminiConfig = geminiConfig;
        this.objectMapper = new ObjectMapper();
    }

    public AnalysisResponse analyzeSymptoms(SymptomRequest request) {
        try {
            // Prepare the prompt for Gemini
            String prompt = buildPrompt(request);

            // Prepare the API call to Gemini
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + geminiConfig.getApiKey());

            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> contents = new HashMap<>();
            contents.put("role", "user");
            contents.put("parts", Collections.singletonList(
                    Collections.singletonMap("text", prompt)));

            requestBody.put("contents", Collections.singletonList(contents));
            requestBody.put("generationConfig", Map.of(
                    "temperature", 0.2,
                    "topP", 0.8,
                    "topK", 40,
                    "maxOutputTokens", 800
            ));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Make the API call
            String response = restTemplate.postForObject(
                    geminiConfig.getApiUrl(),
                    entity,
                    String.class
            );

            // Parse the response
            return parseGeminiResponse(response);

        } catch (Exception e) {
            // Create a fallback response if the API call fails
            return new AnalysisResponse(
                    "Unable to analyze symptoms at this time.",
                    List.of("Analysis service unavailable"),
                    "Please try again later or consult with a healthcare professional directly.",
                    "This is an automated system and cannot replace professional medical advice."
            );
        }
    }

    private String buildPrompt(SymptomRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are a medical symptom analyzer. Analyze the following symptoms and provide: ");
        prompt.append("1) A brief analysis of the symptoms, ");
        prompt.append("2) A list of possible conditions (maximum 5), ");
        prompt.append("3) General recommendations based on the symptoms, ");
        prompt.append("4) A clear disclaimer that this is not professional medical advice and the patient should consult a healthcare provider.\n\n");

        prompt.append("Symptoms: ").append(request.getDescription()).append("\n");

        if (request.getAge() != null && !request.getAge().isEmpty()) {
            prompt.append("Age: ").append(request.getAge()).append("\n");
        }

        if (request.getGender() != null && !request.getGender().isEmpty()) {
            prompt.append("Gender: ").append(request.getGender()).append("\n");
        }

        if (request.getMedicalHistory() != null && !request.getMedicalHistory().isEmpty()) {
            prompt.append("Medical History: ").append(request.getMedicalHistory()).append("\n");
        }

        prompt.append("\nPlease format your response in a way that can be parsed into these categories: Analysis, Possible Conditions, Recommendation, and Disclaimer.");

        return prompt.toString();
    }

    private AnalysisResponse parseGeminiResponse(String responseJson) {
        try {
            JsonNode rootNode = objectMapper.readTree(responseJson);
            JsonNode textNode = rootNode
                    .path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text");

            String content = textNode.asText();

            // Simple parsing logic - can be improved with regex or more sophisticated parsing
            String analysis = extractBetween(content, "Analysis", "Possible Conditions").trim();
            String possibleConditionsText = extractBetween(content, "Possible Conditions", "Recommendation").trim();
            String recommendation = extractBetween(content, "Recommendation", "Disclaimer").trim();
            String disclaimer = extractAfter(content, "Disclaimer").trim();

            List<String> possibleConditions = new ArrayList<>();
            for (String line : possibleConditionsText.split("\\n")) {
                String trimmed = line.trim();
                if (trimmed.startsWith("- ") || trimmed.startsWith("* ") ||
                        (trimmed.length() > 2 && Character.isDigit(trimmed.charAt(0)) && trimmed.charAt(1) == '.')) {
                    possibleConditions.add(trimmed.substring(2).trim());
                } else if (!trimmed.isEmpty()) {
                    possibleConditions.add(trimmed);
                }
            }

            return new AnalysisResponse(analysis, possibleConditions, recommendation, disclaimer);

        } catch (Exception e) {
            // Convert stack trace to string for the response
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String stackTrace = sw.toString();

            return new AnalysisResponse(
                    "Error: " + e.getMessage(),
                    List.of("Stack trace: " + stackTrace),
                    "Debug information above",
                    "This is an automated system and cannot replace professional medical advice."
            );
        }
    }
    private String extractBetween(String text, String start, String end) {
        int startIndex = text.indexOf(start);
        if (startIndex == -1) return "";

        startIndex += start.length();
        int endIndex = text.indexOf(end, startIndex);
        if (endIndex == -1) return text.substring(startIndex);

        return text.substring(startIndex, endIndex);
    }

    private String extractAfter(String text, String marker) {
        int index = text.indexOf(marker);
        if (index == -1) return "";

        return text.substring(index + marker.length());
    }
}
