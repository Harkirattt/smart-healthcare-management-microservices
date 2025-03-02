package com.example.controller;

import com.example.dto.AppointmentDTO;
import com.example.entity.Doctor;
import com.example.service.AppointmentClient;
import com.example.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {
    private final AppointmentClient appointmentClient;

    @GetMapping("/{doctorId}/appointments")
    public ResponseEntity<List<AppointmentDTO>> getDoctorAppointments(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentClient.getAppointmentsForDoctor(doctorId));
    }
}


