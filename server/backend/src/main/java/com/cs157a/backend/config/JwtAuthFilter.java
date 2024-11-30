package com.cs157a.backend.config;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.cs157a.backend.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	@Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
		// Get the cookies from the request
		String token = null;
		if (request.getCookies() != null) {
		    for (Cookie cookie : request.getCookies()) {
		        if ("jwt".equals(cookie.getName())) {
		            token = cookie.getValue();
		            break;
		        }
		    }
		}
		
		// If no token is present, skip the filter
		if (token == null) {
		    filterChain.doFilter(request, response);
		    return;
		}
		
		try {
		    // Extract adminId and validate the token
		    Long adminId = jwtUtil.extractAdminId(token);
		    if (adminId != null && jwtUtil.isTokenValid(token, adminId)) {
		    	// Set adminId in SecurityContextHolder
		        SecurityContextHolder.getContext().setAuthentication(
		            new UsernamePasswordAuthenticationToken(adminId, null, new ArrayList<>())
		        );
		        System.out.println("Valid jwt for Admin ID: " + adminId);
		        request.setAttribute("adminId", adminId);
		    }
		} catch (Exception e) {
		    // Handle token validation errors
		    System.err.println("Invalid JWT token: " + e.getMessage());
		    }
		
		filterChain.doFilter(request, response);
	}
}
