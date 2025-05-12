package com.agroconnect.payment_service.Dto;


import java.math.BigDecimal;

public class PaymentResponseDTO {
    private String paymentId;
    private String buyerId;
    private String listingId;
    private BigDecimal amountPaid;
    private String paymentTime;

    public PaymentResponseDTO() {}

    public PaymentResponseDTO(String paymentId, String buyerId, String listingId, BigDecimal amountPaid, String paymentTime) {
        this.paymentId = paymentId;
        this.buyerId = buyerId;
        this.listingId = listingId;
        this.amountPaid = amountPaid;
        this.paymentTime = paymentTime;
    }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getBuyerId() { return buyerId; }
    public void setBuyerId(String buyerId) { this.buyerId = buyerId; }

    public String getListingId() { return listingId; }
    public void setListingId(String listingId) { this.listingId = listingId; }

    public BigDecimal getAmountPaid() { return amountPaid; }
    public void setAmountPaid(BigDecimal amountPaid) { this.amountPaid = amountPaid; }

    public String getPaymentTime() { return paymentTime; }
    public void setPaymentTime(String paymentTime) { this.paymentTime = paymentTime; }
}
