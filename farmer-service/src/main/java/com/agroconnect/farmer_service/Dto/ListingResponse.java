package com.agroconnect.farmer_service.Dto;

import java.math.BigDecimal;

public record ListingResponse(
    String id,
    String cropName,
    String category,
    BigDecimal pricePerKg,
    int quantityAvailable,
    boolean isOrganic
) {}