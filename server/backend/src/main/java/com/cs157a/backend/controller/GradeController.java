package com.cs157a.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cs157a.backend.dal.GradeDAO;
import com.cs157a.backend.model.Grade;

@RestController
@RequestMapping("/api/grade")
public class GradeController {

    @Autowired
    private GradeDAO gradeDAO;

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
}
