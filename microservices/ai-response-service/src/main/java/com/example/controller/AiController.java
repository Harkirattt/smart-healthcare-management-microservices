package com.example.controller;

import com.example.dto.PromptRequest;
import com.example.dto.AiResponse;
import com.example.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final GeminiService geminiService;

    public AiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public AiResponse generate(@RequestBody PromptRequest request) {
        return geminiService.generateResponse(request);
    }
}
