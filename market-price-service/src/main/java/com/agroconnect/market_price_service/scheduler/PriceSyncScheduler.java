package com.agroconnect.market_price_service.scheduler;


import com.agroconnect.market_price_service.service.MarketPriceService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PriceSyncScheduler {
    private final MarketPriceService service;

    public PriceSyncScheduler(MarketPriceService service) {
        this.service = service;
    }

    @Scheduled(cron = "0 0 * * * *") // Every hour
    public void syncPricesHourly() {
        service.fetchAndSavePrices();
    }
}