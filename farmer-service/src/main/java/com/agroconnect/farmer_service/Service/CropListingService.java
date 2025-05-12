package com.agroconnect.farmer_service.Service;

import com.agroconnect.farmer_service.Dto.CreateListingDTO;
import com.agroconnect.farmer_service.Dto.ListingResponse;
import com.agroconnect.farmer_service.Model.CropListing;
import com.agroconnect.farmer_service.Repository.CropListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CropListingService {

    private final CropListingRepository cropListingRepository;
    private final ImageUploadService imageUploadService;

    public CropListing createListing(CreateListingDTO dto, MultipartFile imageFile) {
        var listing = new CropListing();
        listing.setFarmerId(dto.farmerId());
        listing.setCropName(dto.cropName());
        listing.setCategory(dto.category());
        listing.setPricePerKg(dto.pricePerKg());
        listing.setQuantityAvailable(dto.quantityAvailable());
        listing.setOrganic(dto.isOrganic());
        listing.setLocation(dto.location());

        String imageUrl = imageUploadService.uploadImage(imageFile);
        listing.setImageUrl(imageUrl);

        return cropListingRepository.save(listing);
    }

    public List<ListingResponse> getAllListings() {
        return cropListingRepository.findAll().stream()
                .map(listing -> new ListingResponse(
                        listing.getId(),
                        listing.getFarmerId(),
                        listing.getCropName(),
                        listing.getCategory(),
                        listing.getPricePerKg(),
                        listing.getQuantityAvailable(),
                        listing.isOrganic(),
                        listing.getLocation(),
                        listing.getImageUrl()))
                .toList();
    }

    public List<ListingResponse> getListingsByFarmerId(String farmerId) {
        return cropListingRepository.findByFarmerId(farmerId).stream()
                .map(listing -> new ListingResponse(
                        listing.getId(),
                        listing.getFarmerId(),
                        listing.getCropName(),
                        listing.getCategory(),
                        listing.getPricePerKg(),
                        listing.getQuantityAvailable(),
                        listing.isOrganic(),
                        listing.getLocation(),
                        listing.getImageUrl()))
                .toList();
    }

    public void reduceQuantity(String productId, int quantity) {
        CropListing cropListing = cropListingRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (cropListing.getQuantityAvailable() < quantity) {
            throw new RuntimeException("Insufficient quantity available");
        }

        cropListing.setQuantityAvailable(cropListing.getQuantityAvailable() - quantity);
        cropListingRepository.save(cropListing);
    }

    public ListingResponse getListingById(String listingId) {
        CropListing listing = cropListingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found for id: " + listingId));

        return new ListingResponse(
                listing.getId(),
                listing.getFarmerId(),
                listing.getCropName(),
                listing.getCategory(),
                listing.getPricePerKg(),
                listing.getQuantityAvailable(),
                listing.isOrganic(),
                listing.getLocation(),
                listing.getImageUrl()
        );
    }

}
