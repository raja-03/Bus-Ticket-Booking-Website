package com.tickets.security;


import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(
                "MyTicketBookingProjectSecretKey2026ForJWT"
                .getBytes()
            );

    private final long expirationTime = 86400000;

    // Generate JWT token
    public String generateToken(String email, String role) {

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(
                    new Date(System.currentTimeMillis()
                            + expirationTime)
                )
                .signWith(secretKey)
                .compact();
    }

    // Extract email from token
    public String extractEmail(String token) {

        return extractAllClaims(token)
                .getSubject();
    }

    // Validate token
    public boolean validateToken(String token, String email) {

        String tokenEmail = extractEmail(token);

        return tokenEmail.equals(email)
                && !isTokenExpired(token);
    }

    // Check expiration
    private boolean isTokenExpired(String token) {

        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // Read token claims
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


}
