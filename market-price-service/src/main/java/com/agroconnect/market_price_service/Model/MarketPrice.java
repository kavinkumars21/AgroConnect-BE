package com.agroconnect.market_price_service.Model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "market_prices")
public class MarketPrice {
    @Id
    private String id;

    private String commodity;
    private String market;
    private String state;
    private String district;
    private String variety;
    private String grade;
    private double minPrice;
    private double maxPrice;
    private double modalPrice;
    private LocalDate arrivalDate;

    // Getters and Setters


    public MarketPrice() {

    }

    public MarketPrice(String id, LocalDate arrivalDate, double modalPrice, double maxPrice, double minPrice, String grade, String variety, String district, String state, String market, String commodity) {
        this.id = id;
        this.arrivalDate = arrivalDate;
        this.modalPrice = modalPrice;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.grade = grade;
        this.variety = variety;
        this.district = district;
        this.state = state;
        this.market = market;
        this.commodity = commodity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCommodity() {
        return commodity;
    }

    public void setCommodity(String commodity) {
        this.commodity = commodity;
    }

    public String getMarket() {
        return market;
    }

    public void setMarket(String market) {
        this.market = market;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(double minPrice) {
        this.minPrice = minPrice;
    }

    public double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public double getModalPrice() {
        return modalPrice;
    }

    public void setModalPrice(double modalPrice) {
        this.modalPrice = modalPrice;
    }

    public LocalDate getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(LocalDate arrivalDate) {
        this.arrivalDate = arrivalDate;
    }
}
