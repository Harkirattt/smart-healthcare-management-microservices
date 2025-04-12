package com.example.service;

import com.example.entity.Billing;
import com.example.repository.BillingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingService {
    private final BillingRepository billingRepository;

    public Billing generateInvoice(Billing billing) {
        return billingRepository.save(billing);
    }

    public List<Billing> getAllInvoices() {
        return billingRepository.findAll();
    }

    public List<Billing> getInvoicesByPatientId(Long patientId) {
        return billingRepository.findByPatientId(patientId);
    }
}
