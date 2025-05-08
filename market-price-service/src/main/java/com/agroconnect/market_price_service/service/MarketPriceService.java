package com.agroconnect.market_price_service.service;

import com.agroconnect.market_price_service.Model.MarketPrice;
import com.agroconnect.market_price_service.client.AgmarknetClient;
import com.agroconnect.market_price_service.repository.MarketPriceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MarketPriceService {
    private final AgmarknetClient agmarknetClient;
    private final MarketPriceRepository repository;
    private static final String API_KEY = "579b464db66ec23bdd000001f436e980073b4bdd6780e17e5677bcf6";

    public MarketPriceService(AgmarknetClient agmarknetClient, MarketPriceRepository repository) {
        this.agmarknetClient = agmarknetClient;
        this.repository = repository;
    }

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public List<MarketPrice> fetchAndSavePrices() {
        Map<String, Object> response = agmarknetClient.getMarketData(API_KEY, "json");

        List<Map<String, String>> records = (List<Map<String, String>>) response.get("records");
        List<MarketPrice> prices = new ArrayList<>();

        for (Map<String, String> record : records) {
            MarketPrice price = new MarketPrice();
            price.setCommodity(record.get("commodity"));
            price.setMarket(record.get("market"));
            price.setState(record.get("state"));
            price.setDistrict(record.get("district"));
            price.setVariety(record.get("variety"));
            price.setGrade(record.get("grade"));
            price.setMinPrice(Double.parseDouble(record.get("min_price")));
            price.setMaxPrice(Double.parseDouble(record.get("max_price")));
            price.setModalPrice(Double.parseDouble(record.get("modal_price")));
            price.setArrivalDate(LocalDate.parse(record.get("arrival_date"),formatter));
            prices.add(price);
        }

        return repository.saveAll(prices);
    }

    public List<MarketPrice> getPricesByCommodity(String commodity) {
        return repository.findByCommodityIgnoreCase(commodity);
    }
}