package com.agroconnect.order_service.Dto;

import com.agroconnect.order_service.Model.OrderStatus;
import java.math.BigDecimal;
import java.util.List;

public record OrderResponse(
    String orderId,
    String buyerId,
    List<OrderItemDTO> items,
    BigDecimal totalPrice,
    OrderStatus status
) {}
