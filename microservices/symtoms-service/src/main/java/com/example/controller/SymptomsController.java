package com.example.controller;


import com.example.model.AnalysisResponse;
import com.example.model.SymptomRequest;
import com.example.service.GeminiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/symptoms")
public class SymptomsController {

    private final GeminiService geminiService;

    @Autowired
    public SymptomsController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyzeSymptoms(@Valid @RequestBody SymptomRequest request) {
        AnalysisResponse analysis = geminiService.analyzeSymptoms(request);
        return ResponseEntity.ok(analysis);
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Symptoms Analysis Service is up and running!");
    }
}
