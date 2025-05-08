package com.agroconnect.farmer_service.Controller;

import com.agroconnect.farmer_service.Dto.CreateListingDTO;
import com.agroconnect.farmer_service.Dto.ListingResponse;
import com.agroconnect.farmer_service.Model.CropListing;
import com.agroconnect.farmer_service.Service.CropListingService;
import com.agroconnect.farmer_service.Service.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.util.List;

@RestController
@RequestMapping("/listings")
@RequiredArgsConstructor
public class CropListingController {

    private final CropListingService cropListingService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createListing(HttpServletRequest request, @RequestBody CreateListingDTO dto) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid authorization header");
        }

        String token = authHeader.substring(7);

        List<String> roles = jwtUtil.extractRoles(token);
        System.out.println("Extracted Roles from JWT: " + roles);

        if (!roles.contains("ROLE_FARMER")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User does not have FARMER role");
        }

        String farmerId = jwtUtil.extractFarmerId(token);
        CreateListingDTO updatedDto = new CreateListingDTO(
                farmerId,
                dto.cropName(),
                dto.category(),
                dto.pricePerKg(),
                dto.quantityAvailable(),
                dto.isOrganic(),
                dto.location()
        );
        return ResponseEntity.ok(cropListingService.createListing(updatedDto));
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