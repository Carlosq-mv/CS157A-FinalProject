package com.cs157a.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs157a.backend.dal.AdminDAO;
import com.cs157a.backend.model.Admin;
import com.cs157a.backend.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminDAO adminDAO;
    
    @Autowired
    private JwtUtil jwtUtil;

    // Post request
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        // get admin from the database
        Admin existingAdmin = adminDAO.getAdmin(admin.getAdminId());
        System.out.println(existingAdmin);  // Log the admin info

        // check if the admin exists and the password matches
        if (existingAdmin != null && existingAdmin.getPassword().equals(admin.getPassword())) {
        	// generate JWT token
            String token = jwtUtil.generateToken(admin);

            
            // set the token as an HTTP-only cookie
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)    // Prevent access via JavaScript
                .secure(true)      // Ensure cookie is sent over HTTPS (optional in dev)
                .path("/")         // cookie available for the entire application
                .maxAge(60 * 60 * 2)   // expire in 2 hour
                .build();

            return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body("Login successful");
        } else {
            // admin not found or incorrect password
            return ResponseEntity.status(401).body("Invalid credentials.");
        }
    }
}
