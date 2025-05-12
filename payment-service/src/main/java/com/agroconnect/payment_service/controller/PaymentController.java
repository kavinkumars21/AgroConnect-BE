package com.agroconnect.payment_service.controller;



import com.agroconnect.payment_service.Dto.CreatePaymentDTO;
import com.agroconnect.payment_service.Dto.PaymentResponseDTO;

import com.agroconnect.payment_service.model.Payment;
import com.agroconnect.payment_service.security.JwtUtil;
import com.agroconnect.payment_service.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final JwtUtil jwtUtil;

    public PaymentController(PaymentService paymentService, JwtUtil jwtUtil) {
        this.paymentService = paymentService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> createPayment(HttpServletRequest request, @RequestBody CreatePaymentDTO dto) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid authorization header");
        }

        String token = authHeader.substring(7);
        List<String> roles = jwtUtil.extractRoles(token);

        if (!roles.contains("ROLE_BUYER")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User does not have BUYER role");
        }

        PaymentResponseDTO responseDTO = paymentService.processPayment(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<Payment>> getPaymentsByBuyer(@PathVariable String buyerId) {
        return ResponseEntity.ok(paymentService.getPaymentsByBuyerId(buyerId));
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Payment>> getPaymentsByFarmer(@PathVariable String farmerId) {
        return ResponseEntity.ok(paymentService.getPaymentsByFarmerId(farmerId));
    }
}
