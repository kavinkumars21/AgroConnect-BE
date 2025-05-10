package com.agroconnect.order_service.Dto;

import java.math.BigDecimal;

public record CartItemDTO(
    String listingId,
    int quantity,
    BigDecimal pricePerKg
) {}
