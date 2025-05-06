package com.agroconnect.farmer_service.Repository;

import com.agroconnect.farmer_service.Model.CropListing;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CropListingRepository extends MongoRepository<CropListing, String> {
    List<CropListing> findByFarmerId(String farmerId);
}
