package com.example.dto;

public class FeedbackResponse {
    private Long id;
    private Long doctorId;
    private Long patientId;
    private String comment;
    private int rating;

    public FeedbackResponse(Long id, Long doctorId, Long patientId, String comment, int rating) {
        this.id = id;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.comment = comment;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String feedback) {
        this.comment = feedback;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
