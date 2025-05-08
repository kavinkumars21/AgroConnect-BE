package com.agroconnect.farmer_service.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtUtil {

    private final String SECRET = "fa04ba3741c723e9509224985307f1837da2186aca4c92e4931c854ddf711b5e";

    public String extractFarmerId(String token) {
        Claims claims = getBody(token);
        return claims.get("userId", String.class);
    }

    private Claims getBody(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }

    public List<String> extractRoles(String token) {
        Claims claims = getBody(token);
        return claims.get("roles", List.class); // Extract roles from JWT
    }
}
