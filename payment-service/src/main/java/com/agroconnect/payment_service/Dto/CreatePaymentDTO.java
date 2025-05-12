package com.agroconnect.payment_service.Dto;


import java.math.BigDecimal;

public class CreatePaymentDTO {
    private String buyerId;
    private String listingId;
    private String farmerId;
    private BigDecimal amountPaid;
    private String paymentMode;

    public CreatePaymentDTO() {}

    public CreatePaymentDTO(String buyerId, String listingId, String farmerId, BigDecimal amountPaid, String paymentMode) {
        this.buyerId = buyerId;
        this.listingId = listingId;
        this.farmerId = farmerId;
        this.amountPaid = amountPaid;
        this.paymentMode = paymentMode;
    }

    public String getBuyerId() { return buyerId; }
    public void setBuyerId(String buyerId) { this.buyerId = buyerId; }

    public String getListingId() { return listingId; }
    public void setListingId(String listingId) { this.listingId = listingId; }

    public String getFarmerId() { return farmerId; }
    public void setFarmerId(String farmerId) { this.farmerId = farmerId; }

    public BigDecimal getAmountPaid() { return amountPaid; }
    public void setAmountPaid(BigDecimal amountPaid) { this.amountPaid = amountPaid; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }
}
