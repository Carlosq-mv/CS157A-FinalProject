package com.cs157a.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cs157a.backend.dal.HomeDAO;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/home")
public class HomeController {
    @Autowired
    private HomeDAO homeDAO;

    @GetMapping("/details")
    public ResponseEntity<?> getDetails() {
        int courses = 0, enrollments = 0, students = 0;
        Map<String, Integer> map = new HashMap<>();

        try {
            courses = homeDAO.getDetails("Courses");
            enrollments = homeDAO.getDetails("Enrollments");
            students = homeDAO.getDetails("Students");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException re) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(re.getMessage());
        }

        map.put("courses", courses);
        map.put("enrollments", enrollments);
        map.put("students", students);

        return ResponseEntity.ok(map);

    }

    @PostMapping("/search")
    public ResponseEntity<?> searchCourse(@RequestParam String course) {
        return ResponseEntity.ok(homeDAO.getCourse(course));
    }
}
