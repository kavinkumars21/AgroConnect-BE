package com.agroconnect.buyer_service.Service;

import com.agroconnect.buyer_service.Client.FarmerClient;
import com.agroconnect.buyer_service.Dto.ListingSummaryDTO;
import com.agroconnect.buyer_service.Model.FilterParams;
import com.agroconnect.buyer_service.Repository.ListingRepository;
import com.agroconnect.buyer_service.Util.DistanceUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuyerService {

    private final ListingRepository listingRepository;
    private final FarmerClient farmerClient;
    private final DistanceUtils distanceUtils;

    public List<ListingSummaryDTO> getFilteredListings(String category, Boolean isOrganic, Double maxPrice, String location) {
        List<ListingSummaryDTO> listings = farmerClient.getFilteredListings(category, isOrganic, maxPrice, location);

        return listings.stream()
                .filter(listing -> distanceUtils.calculateDistance(location, listing.location()) < 50) // Max 50km distance
                .collect(Collectors.toList());
    }
}
