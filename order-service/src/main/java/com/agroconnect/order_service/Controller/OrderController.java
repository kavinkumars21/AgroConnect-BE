package com.agroconnect.order_service.Controller;

import com.agroconnect.order_service.Dto.OrderRequest;
import com.agroconnect.order_service.Dto.OrderResponse;
import com.agroconnect.order_service.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.placeOrder(request));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByBuyer(@PathVariable String buyerId) {
        return ResponseEntity.ok(orderService.getOrdersByBuyer(buyerId));
    }
}
