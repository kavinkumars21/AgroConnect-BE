package com.agroconnect.farmer_service.Controller;

import com.agroconnect.farmer_service.Dto.CreateListingDTO;
import com.agroconnect.farmer_service.Dto.ListingResponse;
import com.agroconnect.farmer_service.Model.CropListing;
import com.agroconnect.farmer_service.Service.CropListingService;
import com.agroconnect.farmer_service.Service.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/listings")
@RequiredArgsConstructor
public class CropListingController {

    private final CropListingService cropListingService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<CropListing> createListing(HttpServletRequest request,
                                                     @RequestBody CreateListingDTO dto) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String farmerId = jwtUtil.extractFarmerId(token);

        dto.setFarmerId(farmerId);
        return ResponseEntity.ok(cropListingService.createListing(dto));
    }

    @GetMapping
    public ResponseEntity<List<ListingResponse>> getAllListings() {
        return ResponseEntity.ok(cropListingService.getAllListings());
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<ListingResponse>> getFarmerListings(@PathVariable String farmerId) {
        return ResponseEntity.ok(cropListingService.getListingsByFarmerId(farmerId));
    }
}