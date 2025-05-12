package com.agroconnect.payment_service.repository;



import com.agroconnect.payment_service.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByBuyerId(String buyerId);
    List<Payment> findByFarmerId(String farmerId);
}
