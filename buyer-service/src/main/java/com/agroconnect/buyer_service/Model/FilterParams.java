package com.agroconnect.buyer_service.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FilterParams {
    private String id;
    private String category;
    private Boolean isOrganic;
    private Double maxPrice;
    private String location;
}
