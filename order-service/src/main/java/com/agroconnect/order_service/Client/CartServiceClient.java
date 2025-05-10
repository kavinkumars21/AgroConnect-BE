package com.agroconnect.order_service.Client;

import com.agroconnect.order_service.Dto.CartDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cart-service")
public interface CartServiceClient {
    @GetMapping("/api/cart/{buyerId}")
    CartDTO getCartByBuyerId(@PathVariable String buyerId);
}
