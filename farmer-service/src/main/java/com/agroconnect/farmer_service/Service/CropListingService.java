package com.agroconnect.farmer_service.Service;

import com.agroconnect.farmer_service.Dto.CreateListingDTO;
import com.agroconnect.farmer_service.Dto.ListingResponse;
import com.agroconnect.farmer_service.Model.CropListing;
import com.agroconnect.farmer_service.Repository.CropListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CropListingService {

    private final CropListingRepository cropListingRepository;

    public CropListing createListing(CreateListingDTO dto) {
        var listing = new CropListing();
        listing.setFarmerId(dto.farmerId());
        listing.setCropName(dto.cropName());
        listing.setCategory(dto.category());
        listing.setPricePerKg(dto.pricePerKg());
        listing.setQuantityAvailable(dto.quantityAvailable());
        listing.setOrganic(dto.isOrganic());
        return cropListingRepository.save(listing);
    }

    public List<ListingResponse> getAllListings() {
        return cropListingRepository.findAll().stream()
                .map(listing -> new ListingResponse(
                        listing.getId(),
                        listing.getCropName(),
                        listing.getCategory(),
                        listing.getPricePerKg(),
                        listing.getQuantityAvailable(),
                        listing.isOrganic()))
                .toList();
    }

    public List<ListingResponse> getListingsByFarmerId(String farmerId) {
        return cropListingRepository.findByFarmerId(farmerId).stream()
                .map(listing -> new ListingResponse(
                        listing.getId(),
                        listing.getCropName(),
                        listing.getCategory(),
                        listing.getPricePerKg(),
                        listing.getQuantityAvailable(),
                        listing.isOrganic()))
                .toList();
    }
}
