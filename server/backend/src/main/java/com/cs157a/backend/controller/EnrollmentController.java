package com.cs157a.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cs157a.backend.dal.CourseDAO;
import com.cs157a.backend.dal.EnrollmentDAO;
import com.cs157a.backend.dal.StudentDAO;
import com.cs157a.backend.dto.EnrollmentForm;
import com.cs157a.backend.model.Course;
import com.cs157a.backend.model.Enrollment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentDAO enrollmentDAO;
    
    @Autowired
    private StudentDAO studentDAO;
    
    @Autowired 
    private CourseDAO courseDAO;
    

    @GetMapping("/enrollment-details")
    public ResponseEntity<?> getEnrollmentDetails(@RequestParam(required = false) String param) {
        return ResponseEntity.status(200).body(enrollmentDAO.getEnrollmentDetails());
    }
    

    // Create
    @PostMapping("/add-enrollment")
    public ResponseEntity<?> addEnrollment(@RequestBody EnrollmentForm enrollment) {
        if (enrollment == null || enrollment.getCourseName() == null || enrollment.getCourseName().isBlank() || enrollment.getCourseSection() == 0) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Please fill all form details.");
        }
    	// check if the student exists
    	if(!studentDAO.exists(enrollment.getStudentId())) {
    		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Student does not exist.");
    	}
    	
    	// get the course from the enrollment form
    	Course c = courseDAO.getCourseByNameAndSection(enrollment.getCourseName(), enrollment.getCourseSection());
    	
    	// check if the course exist
    	if(c == null) {
    		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Course does not exitst.");
    	}
    	
    	// check if there is already a student enrolled into a course
    	if(enrollmentDAO.enrollmentExists(enrollment.getStudentId(), c.getCourseId())) {
    		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Student already enrolled in this course.");
    	}
    	
    	// create Enrollment object
    	Enrollment e = new Enrollment(null, enrollment.getStudentId(), c.getCourseId(), LocalDate.now());
    
        // Add new enrollment record
        enrollmentDAO.addRecord(e);

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
