package com.ecommerce.backend.entity;


public class TransactionDetails {

    private String orderId;
    private String currency;
    private Integer amount;
    private Long created_at;
    private String timeStamp;
    private String razorpayKeyId;

    public TransactionDetails() {
    }


    public TransactionDetails(String orderId, String currency, Integer amount, Long created_at, String timeStamp, String razorpayKeyId) {
        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
        this.created_at = created_at;
        this.timeStamp = timeStamp;
        this.razorpayKeyId = razorpayKeyId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Long getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Long created_at) {
        this.created_at = created_at;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getRazorpayKeyId() {
        return razorpayKeyId;
    }

    public void setRazorpayKeyId(String razorpayKeyId) {
        this.razorpayKeyId = razorpayKeyId;
    }
}
