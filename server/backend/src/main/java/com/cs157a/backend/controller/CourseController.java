package com.cs157a.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cs157a.backend.dal.CourseDAO;
import com.cs157a.backend.model.Course;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseDAO courseDAO;

    // Create
    @PostMapping("/add-course")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        // add new course record
        courseDAO.addRecord(course);
        
        // return the new course record
        return ResponseEntity.status(HttpStatus.CREATED).body(course);
    }

    // Read
    @GetMapping("/all-courses")
    public ResponseEntity<?> getCourses() {
        List<Course> courses = courseDAO.getRecords();
        
        // return the records if they exist
        if (!courses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(courses);
        } else {
            // return error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No courses found.");
        }
    }

    // Update
    @PutMapping("/update-course/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        
        // check if the course exists in database (by id)
        if (!courseDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found.");
        }
        
        //set the id
        course.setCourseId(id);
        
        // call dao method to update the record
        courseDAO.updateRecord(course);
        
        // return the updated course record
        return ResponseEntity.status(HttpStatus.OK).body(course);
    }

    // Delete
    @DeleteMapping("/delete-course/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        
        // check if the course exists in database (by id)
        if (!courseDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found.");
        }

        // delete the course record
        courseDAO.deleteRecord(id);
        
        // return success message
        return ResponseEntity.status(HttpStatus.OK).body("Course deleted successfully.");
    }

    // get course by id
    @GetMapping("/get-course/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        
        // check if the course exists in database (by id)
        if (!courseDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course does not exist.");
        }

        // get the course record
        Course course = courseDAO.getRecordById(id);

        // return the course record
        return ResponseEntity.status(HttpStatus.OK).body(course);
    }
}
