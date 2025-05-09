package com.agroconnect.order_service.Dto;

public record OrderRequest(
        String buyerId,
        String listingId,
        int quantity
) { }
