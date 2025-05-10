package com.agroconnect.order_service.Dto;

import java.math.BigDecimal;

public record ListingSummaryDTO(
        String id,
        String farmerId,
        String cropName,
        String category,
        BigDecimal pricePerKg,
        int quantityAvailable,
        boolean isOrganic,
        String location
) {}
