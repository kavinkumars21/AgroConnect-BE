package com.agroconnect.buyer_service.Controller;

import com.agroconnect.buyer_service.Dto.ListingSummaryDTO;
import com.agroconnect.buyer_service.Service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buyer")
@RequiredArgsConstructor
public class BuyerController {

    private final BuyerService buyerService;

    @GetMapping("/listings")
    public ResponseEntity<List<ListingSummaryDTO>> getFilteredListings(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean isOrganic,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String location) {
        System.out.println("buyerService");
        System.out.println(buyerService);

        return ResponseEntity.ok(buyerService.getFilteredListings(category, isOrganic, maxPrice, location));
    }
}
