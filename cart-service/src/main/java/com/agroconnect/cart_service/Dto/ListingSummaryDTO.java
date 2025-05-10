package com.agroconnect.cart_service.Dto;

import java.math.BigDecimal;

public record ListingSummaryDTO(
    String id,
    String cropName,
    String category,
    BigDecimal pricePerKg,
    int quantityAvailable,
    boolean isOrganic,
    String location,
    String farmerId
) {}
