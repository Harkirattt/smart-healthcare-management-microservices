package com.example.controller;

import com.example.dto.FeedbackRequest;
import com.example.dto.FeedbackResponse;
import com.example.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackRequest request) {
        feedbackService.submitFeedback(request);
        return ResponseEntity.ok("Feedback submitted successfully.");
    }

    @GetMapping("/doctor/{doctorId}")
    public List<FeedbackResponse> getFeedbackForDoctor(@PathVariable Long doctorId) {
        return feedbackService.getFeedbackForDoctor(doctorId);
    }
}

