package com.agroconnect.cart_service.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CartItem {
    private String id;
    private String listingId;
    private int quantity;
    private BigDecimal pricePerKg;
}
