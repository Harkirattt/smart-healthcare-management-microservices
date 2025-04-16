package com.example.service;

import com.example.dto.FeedbackRequest;
import com.example.dto.FeedbackResponse;
import com.example.entity.Feedback;
import com.example.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }
    public Feedback saveFeedback(FeedbackRequest request) {
        Feedback feedback = new Feedback();
        feedback.setDoctorId(request.getDoctorId());
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());

        return feedbackRepository.save(feedback);
    }
    public void submitFeedback(FeedbackRequest request) {
    }

    public List<FeedbackResponse> getFeedbackForDoctor(Long doctorId) {
        return feedbackRepository.findByDoctorId(doctorId);
    }
}
