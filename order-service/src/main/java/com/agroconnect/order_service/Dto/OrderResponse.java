package com.agroconnect.order_service.Dto;

import com.agroconnect.order_service.Model.OrderStatus;
import java.math.BigDecimal;

public record OrderResponse(
        String orderId,
        String listingId,
        String farmerId,
        int quantity,
        BigDecimal totalPrice,
        OrderStatus status
) {}
