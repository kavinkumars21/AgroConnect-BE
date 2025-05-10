package com.agroconnect.order_service.Dto;

import java.math.BigDecimal;

public record OrderItemDTO(
    String listingId,
    int quantity,
    BigDecimal pricePerKg,
    BigDecimal itemTotalPrice
) {}
