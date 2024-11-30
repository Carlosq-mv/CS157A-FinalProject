package com.cs157a.backend.util;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.cs157a.backend.model.Admin;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtil {
	private static final String SECRET_KEY="1b499c8e1420af3445b09464b20a6d8e2f58a73ba742dd93b15a81e53a50d073";
	private static final int EXP_TIME=1000 * 60 * 60 * 2; // 2 hours in ms
	
	
	// generate a token with only admin id
	public String generateToken(Admin adminDetails) {
		return generateToken(new HashMap<>(), adminDetails);
	}
	
	// generate a token with admin id and other optional claims
	public String generateToken(Map<String, Object> extraClaims, Admin adminDetails) {
		return Jwts
				.builder()
				.setClaims(extraClaims)
				.setSubject(String.valueOf(adminDetails.getAdminId()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + EXP_TIME))
				.signWith(getSignInKey(), SignatureAlgorithm.HS256)
				.compact();					
	}
	
	// method to extract a claim
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	
	// get the adminid from the token
	public Long extractAdminId(String token) {
		return Long.parseLong(extractClaim(token, Claims::getSubject));
	}
	
	// get the username from the token
//	public String extractUsername(String token) {
//		return extractClaim(token, Claims::getSubject);
//	}
	
	// check if the token is valid i.e. the id is from current admin and it is not expired
	public boolean isTokenValid(String token, Long adminId) {
		final Long id = extractAdminId(token);
		return(id.equals(adminId) && !isTokenExpired(token));
	}
	
	
	// get the sign in key
	private Key getSignInKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	// extract expiration details from token
	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	
	// check if the token is expired
	private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
	
	// extract claims from the token
    private Claims extractAllClaims(String token) {
        return Jwts
        		.parserBuilder()
        		.setSigningKey(getSignInKey())
        		.build()
        		.parseClaimsJws(token)
        		.getBody();		
    }

}
