package com.example.controller;

import com.example.entity.Billing;
import com.example.service.BillingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
@Tag(name="Billing APIs",description = "Create and Read Billing Invoices")
public class BillingController {
    private final BillingService billingService;

    @PostMapping
    public ResponseEntity<Billing> generateInvoice(@RequestBody Billing billing) {
        return ResponseEntity.ok(billingService.generateInvoice(billing));
    }

    @GetMapping
    public ResponseEntity<List<Billing>> getInvoices() {
        return ResponseEntity.ok(billingService.getAllInvoices());
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Billing>> getInvoicesByPatientId(@PathVariable Long patientId) {
        return ResponseEntity.ok(billingService.getInvoicesByPatientId(patientId));
    }
}

