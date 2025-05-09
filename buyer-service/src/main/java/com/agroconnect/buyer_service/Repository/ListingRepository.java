package com.agroconnect.buyer_service.Repository;

import com.agroconnect.buyer_service.Dto.ListingSummaryDTO;
import com.agroconnect.buyer_service.Model.FilterParams;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends MongoRepository<ListingSummaryDTO, String> {

    @Query("{ $and: [ " +
            "?0 == null ? {} : { category: ?0 }, " +
            "?1 == null ? {} : { isOrganic: ?1 }, " +
            "?2 == null ? {} : { pricePerKg: { $lte: ?2 } }, " +
            "?3 == null ? {} : { location: ?3 } " +
            "] }")
    List<ListingSummaryDTO> filterListings(String id,String category, Boolean isOrganic, Double maxPrice, String location);
}
