package com.example.dto;

public class FeedbackRequest {
    private Long userId;      // Who is giving the feedback
    private Long doctorId;    // Which doctor it's for
    private Integer rating;   // Rating, e.g. 1–5 stars
    private String comment;   // Optional text feedback

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
