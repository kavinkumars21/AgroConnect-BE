package com.agroconnect.auth_service.dto;

public record RegisterRequest(String userName, String email, String phoneNumber, String password) {
}
