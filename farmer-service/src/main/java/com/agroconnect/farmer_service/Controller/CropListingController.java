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
import org.springframework.web.multipart.MultipartFile;

import java.net.http.HttpRequest;
import java.util.List;

@RestController
@RequestMapping("/listings")
@RequiredArgsConstructor
public class CropListingController {

    private final CropListingService cropListingService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createListing(HttpServletRequest request, @RequestBody MultipartFile imageFile,
                                           @ModelAttribute CreateListingDTO dto) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid authorization header");
        }

        String token = authHeader.substring(7);

        List<String> roles = jwtUtil.extractRoles(token);

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
        return ResponseEntity.ok(cropListingService.createListing(updatedDto,imageFile));
    }

    @GetMapping
    public ResponseEntity<List<ListingResponse>> getAllListings() {
        return ResponseEntity.ok(cropListingService.getAllListings());
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<ListingResponse>> getFarmerListings(@PathVariable String farmerId) {
        return ResponseEntity.ok(cropListingService.getListingsByFarmerId(farmerId));
    }

    @PutMapping("/{productId}/reduce")
    public ResponseEntity<String> reduceProductQuantity(@PathVariable String productId,
                                                        @RequestParam int quantity) {
        cropListingService.reduceQuantity(productId, quantity);
        return ResponseEntity.ok("Product quantity reduced successfully.");
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<ListingResponse> getListingById(@PathVariable String listingId) {
        ListingResponse dto = cropListingService.getListingById(listingId);
        return ResponseEntity.ok(dto);
    }

}
