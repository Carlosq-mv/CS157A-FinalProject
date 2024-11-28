package com.cs157a.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs157a.backend.dal.AdminDAO;
import com.cs157a.backend.model.Admin;
import com.cs157a.backend.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminDAO adminDAO;

    @Autowired
    private JwtUtil jwtUtil;

    // Post request
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        // check if the request body is null
        if(admin == null || admin.getAdminId() == 0 || admin.getPassword() == null || admin.getPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please fill all fields to login.");
        }
        // get admin from the database
        Admin existingAdmin = adminDAO.getAdmin(admin.getAdminId());


        // check if the admin exists and the password matches
        if (existingAdmin != null && existingAdmin.getPassword().equals(admin.getPassword())) {
            // generate JWT token
            String token = jwtUtil.generateToken(admin);

            // set the token as an HTTP-only cookie
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true) // Prevent access via JavaScript
                    .secure(true) // Ensure cookie is sent over HTTPS (optional in dev)
                    .path("/") // cookie available for the entire application
                    .maxAge(60 * 60 * 2) // expire in 2 hour
                    .build();

            return ResponseEntity.ok()
                    .header("Set-Cookie", cookie.toString())
                    .body(admin);
        } else {
            // admin not found or incorrect password
            return ResponseEntity.status(401).body("Invalid credentials.");
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentAdmin(HttpServletRequest request) {
        // get the current admin id stored in the request
        Long adminId = (Long) request.getAttribute("adminId");

        // check if there is an admin id
        if (adminId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unauthorized and(or) missing/invalid token");
        }

        // get the current admin user based on the admin id stored in request
        Admin currentUser = adminDAO.getAdmin(adminId);

        // check the admin object is not null
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error retrieveing admin user from database");
        }

        // return the admin object
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(currentUser);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Clear the JWT cookie
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true) // Keep HttpOnly for security
                .secure(true) // Ensure it's only sent over HTTPS (optional in dev)
                .path("/") // Ensure it applies to the entire application
                .maxAge(0) // Immediately expire the cookie
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body("Logout successful");
    }

    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        Admin a = adminDAO.createAdmin(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(a);
    }

}
