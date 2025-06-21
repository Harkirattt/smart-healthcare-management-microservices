package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class AnalysisResponse {
    public AnalysisResponse() {
    }
    public AnalysisResponse(String analysis, List<String> possibleConditions, String recommendation, String disclaimer) {
        this.analysis = analysis;
        this.possibleConditions = possibleConditions;
        this.recommendation = recommendation;
        this.disclaimer = disclaimer;
    }

    public String getAnalysis() {
        return analysis;
    }

    public void setAnalysis(String analysis) {
        this.analysis = analysis;
    }

    public List<String> getPossibleConditions() {
        return possibleConditions;
    }

    public void setPossibleConditions(List<String> possibleConditions) {
        this.possibleConditions = possibleConditions;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public String getDisclaimer() {
        return disclaimer;
    }

    public void setDisclaimer(String disclaimer) {
        this.disclaimer = disclaimer;
    }

    private String analysis;
    private List<String> possibleConditions;
    private String recommendation;
    private String disclaimer;
}

