package com.agroconnect.order_service.Client;

import com.agroconnect.order_service.Dto.ListingSummaryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@FeignClient(name = "farmer-service")
public interface FarmerServiceClient {

    @GetMapping("/api/listings/{listingId}")
    ListingSummaryDTO getListingDetails(@PathVariable String listingId);

    @PutMapping("/api/listings/{productId}/reduce")
    void reduceProductQuantity(@PathVariable("productId") String productId,
                               @RequestParam("quantity") int quantity);
}
