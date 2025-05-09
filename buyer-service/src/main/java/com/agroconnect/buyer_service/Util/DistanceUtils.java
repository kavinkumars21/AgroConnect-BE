package com.agroconnect.buyer_service.Util;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DistanceUtils {

    private static final String GOOGLE_API_KEY = "your_google_maps_api_key";
    private static final String GOOGLE_MAPS_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

    public double calculateDistance(String origin, String destination) {
        String url = GOOGLE_MAPS_URL + "?origins=" + origin + "&destinations=" + destination + "&key=" + GOOGLE_API_KEY;
        RestTemplate restTemplate = new RestTemplate();

        String response = restTemplate.getForObject(url, String.class);
        // 🔹 Extract distance from JSON response (implement JSON parsing)
        return extractDistanceFromJson(response);
    }

    private double extractDistanceFromJson(String jsonResponse) {
        // 🔹 Parse JSON response to get the distance (implement actual parsing logic)
        return Math.random() * 50; // Placeholder logic
    }
}
