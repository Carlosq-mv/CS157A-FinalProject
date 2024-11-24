package com.cs157a.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cs157a.backend.dal.EnrollmentDAO;
import com.cs157a.backend.model.Enrollment;

@RestController
@RequestMapping("/api/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentDAO enrollmentDAO;

    // Create
    @PostMapping("/add-enrollment")
    public ResponseEntity<?> addEnrollment(@RequestBody Enrollment enrollment) {
        // Add new enrollment record
        enrollmentDAO.addRecord(enrollment);

        // Return the new enrollment record
        return ResponseEntity.status(HttpStatus.CREATED).body(enrollment);
    }

    // Read all
    @GetMapping("/all-enrollments")
    public ResponseEntity<?> getEnrollments() {
        List<Enrollment> enrollments = enrollmentDAO.getRecords();

        // Return the records if they exist
        if (!enrollments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(enrollments);
        } else {
            // Return error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No enrollments found.");
        }
    }

    // Update
    @PutMapping("/update-enrollment/{id}")
    public ResponseEntity<?> updateEnrollment(@PathVariable Long id, @RequestBody Enrollment enrollment) {

        // Check if the enrollment exists in the database (by id)
        if (!enrollmentDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found.");
        }

        // Set the ID
        enrollment.setEnrollmentId(id);

        // Call DAO method to update the record
        enrollmentDAO.updateRecord(enrollment);

        // Return the updated enrollment record
        return ResponseEntity.status(HttpStatus.OK).body(enrollment);
    }

    // Delete
    @DeleteMapping("/delete-enrollment/{id}")
    public ResponseEntity<?> deleteEnrollment(@PathVariable Long id) {

        // Check if the enrollment exists in the database (by id)
        if (!enrollmentDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found.");
        }

        // Delete the enrollment record
        enrollmentDAO.deleteRecord(id);

        // Return success message
        return ResponseEntity.status(HttpStatus.OK).body("Enrollment deleted successfully.");
    }

    // Get enrollment by ID
    @GetMapping("/get-enrollment/{id}")
    public ResponseEntity<?> getEnrollmentById(@PathVariable Long id) {

        // Check if the enrollment exists in the database (by id)
        if (!enrollmentDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment does not exist.");
        }

        // Get the enrollment record
        Enrollment enrollment = enrollmentDAO.getRecordById(id);

        // Return the enrollment record
        return ResponseEntity.status(HttpStatus.OK).body(enrollment);
    }
}
