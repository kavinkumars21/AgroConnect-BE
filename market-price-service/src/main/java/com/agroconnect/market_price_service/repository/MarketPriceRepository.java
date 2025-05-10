package com.agroconnect.market_price_service.repository;



import com.agroconnect.market_price_service.Model.MarketPrice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MarketPriceRepository extends MongoRepository<MarketPrice, String> {
    List<MarketPrice> findByCommodityIgnoreCase(String commodity);
}
