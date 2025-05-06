package com.agroconnect.farmer_service.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

@Service
public class JwtUtil {

    public String extractFarmerId(String token) {
        String SECRET_KEY = "fa04ba3741c723e9509224985307f1837da2186aca4c92e4931c854ddf711b5e";
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject(); // Assuming Farmer ID is in 'sub' claim
    }
}
