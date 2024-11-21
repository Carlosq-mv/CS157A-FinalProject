package com.cs157a.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs157a.backend.dal.AdminDAO;
import com.cs157a.backend.model.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminDAO adminDAO;

    // Post request
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        // get admin from the database
        Admin existingAdmin = adminDAO.getAdmin(admin.getAdminId());
        System.out.println(existingAdmin);  // Log the admin info

        // check if the admin exists and the password matches
        if (existingAdmin != null && existingAdmin.getPassword().equals(admin.getPassword())) {
            // return successfull message if password matches
            return ResponseEntity.ok("Login successful");
        } else {
            // admin not found or incorrect password
            return ResponseEntity.status(401).body("Invalid credentials.");
        }
    }
}
