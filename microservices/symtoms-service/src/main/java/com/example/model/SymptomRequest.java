package com.example.model;

import jakarta.validation.constraints.NotBlank;



public class SymptomRequest {
    @NotBlank(message = "Symptom description cannot be empty")

    private String description;

    private String age;
    private String gender;
    private String medicalHistory;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }
}
