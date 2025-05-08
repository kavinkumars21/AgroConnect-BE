package com.agroconnect.farmer_service.Dto;

import java.math.BigDecimal;

public record CreateListingDTO(
    String farmerId,
    String cropName,
    String category,
    BigDecimal pricePerKg,
    int quantityAvailable,
    boolean isOrganic,
    String location
) {
}
