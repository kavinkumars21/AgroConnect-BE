package com.agroconnect.order_service.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String buyerId;
    private String listingId;
    private String farmerId;
    private int quantity;
    private BigDecimal totalPrice;
    private OrderStatus status;
}
