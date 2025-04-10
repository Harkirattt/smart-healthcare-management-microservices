package com.example.fallbackcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/users")
    public String userServiceFallback() {
        return "User Service is currently unavailable. Please try again later.";
    }

    @GetMapping("/news")
    public String newsServiceFallback() {
        return "News Service is currently unavailable. Please try again later.";
    }

    @GetMapping("/context")
    public String contextServiceFallback() {
        return "Context Service is currently unavailable. Please try again later.";
    }

    @GetMapping("/llm")
    public String llmServiceFallback() {
        return "LLM Service is currently unavailable. Please try again later.";
    }

    @GetMapping("/recommendations")
    public String recommendationServiceFallback() {
        return "Recommendation Service is currently unavailable. Please try again later.";
    }
}
