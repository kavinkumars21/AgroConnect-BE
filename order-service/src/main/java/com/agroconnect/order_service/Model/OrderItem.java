package com.agroconnect.order_service.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    private String listingId;
    private int quantity;
    private BigDecimal pricePerKg;
    private BigDecimal itemTotalPrice;
}
