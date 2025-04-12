package com.example.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentDTO {
    private Long id;
    private String doctorName;
    private String patientName;
    private LocalDateTime appointmentDate;
    private String status;
}

