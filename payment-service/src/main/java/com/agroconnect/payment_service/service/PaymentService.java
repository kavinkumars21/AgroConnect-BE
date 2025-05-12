package com.agroconnect.payment_service.service;



import com.agroconnect.payment_service.Dto.CreatePaymentDTO;
import com.agroconnect.payment_service.Dto.PaymentResponseDTO;

import com.agroconnect.payment_service.model.Payment;
import com.agroconnect.payment_service.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public PaymentResponseDTO processPayment(CreatePaymentDTO dto) {
        Payment payment = new Payment();
        payment.setPaymentId(UUID.randomUUID().toString());
        payment.setBuyerId(dto.getBuyerId());
        payment.setListingId(dto.getListingId());
        payment.setFarmerId(dto.getFarmerId());
        payment.setAmountPaid(dto.getAmountPaid());
        payment.setPaymentMode(dto.getPaymentMode());
        payment.setPaymentTime(LocalDateTime.now());

        Payment saved = paymentRepository.save(payment);
        return mapToResponse(saved);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public List<Payment> getPaymentsByBuyerId(String buyerId) {
        return paymentRepository.findByBuyerId(buyerId);
    }

    public List<Payment> getPaymentsByFarmerId(String farmerId) {
        return paymentRepository.findByFarmerId(farmerId);
    }

    private PaymentResponseDTO mapToResponse(Payment payment) {
        String formattedTime = payment.getPaymentTime()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        return new PaymentResponseDTO(
                payment.getPaymentId(),
                payment.getBuyerId(),
                payment.getListingId(),
                payment.getAmountPaid(),
                formattedTime
        );
    }
}
