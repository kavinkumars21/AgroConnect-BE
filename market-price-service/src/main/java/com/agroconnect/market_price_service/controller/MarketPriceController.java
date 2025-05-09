package com.agroconnect.market_price_service.controller;

import com.agroconnect.market_price_service.Model.MarketPrice;
import com.agroconnect.market_price_service.service.MarketPriceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prices")
public class MarketPriceController {
    private final MarketPriceService service;

    public MarketPriceController(MarketPriceService service) {
        this.service = service;
    }

    @GetMapping("/sync")
    public String syncData() {
        service.fetchAndSavePrices();
        return "Prices synced successfully!";
    }

    @GetMapping("/{commodity}")
    public List<MarketPrice> getPrices(@PathVariable String commodity) {
        return service.getPricesByCommodity(commodity);
    }
}
