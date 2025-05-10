package com.agroconnect.cart_service.Client;

import com.agroconnect.cart_service.Dto.ListingSummaryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "farmer-service")
public interface FarmerServiceClient {
    
    @GetMapping("/api/listings/{listingId}")
    ListingSummaryDTO getListingDetails(@PathVariable String listingId);
}
