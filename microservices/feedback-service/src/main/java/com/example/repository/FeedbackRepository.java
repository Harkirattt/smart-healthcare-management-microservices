package com.example.repository;

import com.example.dto.FeedbackResponse;
import com.example.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<FeedbackResponse> findByDoctorId(Long doctorId);

}
