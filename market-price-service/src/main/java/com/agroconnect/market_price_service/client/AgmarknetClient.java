package com.agroconnect.market_price_service.client;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "agmarknet-client", url = "https://api.data.gov.in")
public interface AgmarknetClient {

    @GetMapping("/resource/9ef84268-d588-465a-a308-a864a43d0070")
    Map<String, Object> getMarketData(
            @RequestParam("api-key") String apiKey,
            @RequestParam("format") String format
    );
}
