package com.agroconnect.farmer_service.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Getter
@Setter
@Document(collection = "crop_listings")
public class CropListing {

    @Id
    private String id;
    private String farmerId;
    private String cropName;
    private String category;
    private BigDecimal pricePerKg;
    private int quantityAvailable;
    private boolean isOrganic;
    private String location;
    private String imageUrl;
}
