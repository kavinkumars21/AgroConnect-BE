package com.agroconnect.buyer_service.Client;

import com.agroconnect.buyer_service.Dto.ListingSummaryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "farmer-service")
public interface FarmerClient {
    
    @GetMapping("/api/listings")
    List<ListingSummaryDTO> getFilteredListings(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean isOrganic,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String location);
}
