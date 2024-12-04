package com.cs157a.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cs157a.backend.dal.GradeDAO;
import com.cs157a.backend.dal.StudentDAO;
import com.cs157a.backend.dto.GradingDetails;
import com.cs157a.backend.model.Grade;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/grade")
public class GradeController {

    @Autowired
    private GradeDAO gradeDAO;

    @Autowired
    private StudentDAO studentDAO;

    @PostMapping("/add-grade")
    public ResponseEntity<?> addGrade(@RequestBody Grade grade) {
        gradeDAO.addRecord(grade);
        return ResponseEntity.status(HttpStatus.CREATED).body(grade);
    }

    @GetMapping("/all-grades")
    public ResponseEntity<?> getGrades() {
        List<Grade> grades = gradeDAO.getRecords();
        if (!grades.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(grades);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No grades found.");
        }
    }

    @PutMapping("/update-grade/{id}")
    public ResponseEntity<?> updateGrade(@PathVariable Long id, @RequestBody Grade grade) {
        if (!gradeDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Grade not found.");
        }
        grade.setGradeId(id);
        gradeDAO.updateRecord(grade);
        return ResponseEntity.status(HttpStatus.OK).body(grade);
    }

    @DeleteMapping("/delete-grade/{id}")
    public ResponseEntity<?> deleteGrade(@PathVariable Long id) {
        if (!gradeDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Grade not found.");
        }
        gradeDAO.deleteRecord(id);
        return ResponseEntity.status(HttpStatus.OK).body("Grade deleted successfully.");
    }

    @GetMapping("/get-grade/{id}")
    public ResponseEntity<?> getGradeById(@PathVariable Long id) {
        if (!gradeDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Grade does not exist.");
        }
        Grade grade = gradeDAO.getRecordById(id);
        return ResponseEntity.status(HttpStatus.OK).body(grade);
    }


    // get grading details with a student email
    // TODO: look into pagination to limit the number of records returned if there is alot
    @GetMapping("/get-details")
    public ResponseEntity<?> getEnrollmentAndGradingDetails(@RequestParam String studentEmail) {
        // check if there is not parameter or it is not in correct format
        if (studentEmail == null || studentEmail.trim().isEmpty() || !studentEmail.contains("@")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or missing student email.");
        }
        // check if the student exists
        if(!studentDAO.exists(studentEmail)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student does not exist. Please try again.");
        }

        // get all the grading info
        List<GradingDetails> details = gradeDAO.getGradeAndEnrollmentDetails(studentEmail);
        // check if the student does have enrollments
        if (details == null || details.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student is not currently enrolled in any courses.");
        }

        // check if the student does have details to return
        if(details.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student is not currently enrolled in any courses.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(details);
    }
}
