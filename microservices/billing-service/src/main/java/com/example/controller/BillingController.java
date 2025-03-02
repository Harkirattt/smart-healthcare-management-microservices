package com.example.controller;

import com.example.entity.Billing;
import com.example.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
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
}

