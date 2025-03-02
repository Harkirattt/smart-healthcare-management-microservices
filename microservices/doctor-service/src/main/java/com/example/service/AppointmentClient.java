package com.example.service;

import com.example.dto.AppointmentDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "APPOINTMENT-SERVICE")
public interface AppointmentClient {
    @GetMapping("/api/appointments/doctor/{id}")
    List<AppointmentDTO> getAppointmentsForDoctor(@PathVariable Long id);
}
