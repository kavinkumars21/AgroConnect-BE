package com.agroconnect.order_service.Dto;

import java.math.BigDecimal;
import java.util.List;

public record CartDTO(
    String buyerId,
    List<CartItemDTO> items,
    BigDecimal totalPrice
) {}
