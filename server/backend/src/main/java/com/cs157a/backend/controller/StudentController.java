package com.cs157a.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs157a.backend.dal.StudentDAO;
import com.cs157a.backend.model.Student;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentDAO studentDAO;

    // Create
    @PostMapping("/add-student")
    public ResponseEntity<?> addStudentRecord(@RequestBody Student student) {
        // check if the student is null
        if (student == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No student object.");
        }

        // check if any fields are empty
        if (student.getEmail() == null || student.getEmail().isBlank() ||
                student.getName() == null || student.getName().isBlank() ||
                student.getPhoneNum() == null || student.getPhoneNum().isBlank() ||
                student.getDateOfBirth() == null) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Please fill all form fields.");
        }

        // check if the student email already exists
        if (studentDAO.isDuplicate(student)) {
            // return error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Student email already exists.");
        }

        // validate phone format
        String phoneRegex = "^\\d{3}-\\d{3}-\\d{4}$";
        if (!student.getPhoneNum().matches(phoneRegex)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid phone format: xxx-xxx-xxxx");
        }

        student.setStudentId(student.getStudentId());
        // add new student record
        studentDAO.addRecord(student);

        // return the new student record
        return ResponseEntity.status(HttpStatus.CREATED).body(student);
    }

    // Read
    @GetMapping("/all-students")
    public ResponseEntity<?> getStudentRecords(@RequestParam(required = false) String param) {

        // get all records of students in database
        List<Student> students = studentDAO.getRecords();

        // return the records if they exists
        if (students.size() != 0) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(students);
        } else {
            // return error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No students in databse.");
        }
    }

    // Update
    @PutMapping("/update-student/{id}")
    public ResponseEntity<?> updateStudentRecord(@PathVariable Long id, @RequestBody Student student) {

        // check if the student exists in database (by id)
        if (!studentDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student does not exist.");
        }
        // check if any fields are empty or deleted 
        if (student.getEmail() == null || student.getEmail().isBlank() ||
                student.getName() == null || student.getName().isBlank() ||
                student.getPhoneNum() == null || student.getPhoneNum().isBlank() ||
                student.getDateOfBirth() == null) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Empty form fields.");
        }

        // Validate the phone format when updating student record
        String phoneRegex = "^\\d{3}-\\d{3}-\\d{4}$";
        if (!student.getPhoneNum().matches(phoneRegex)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid phone format: xxx-xxx-xxxx");
        }
        // set the id
        student.setStudentId(id);

        // call dao method to update the record
        studentDAO.updateRecord(student);

        // return the updated student record
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(student);
    }

    // Delete
    @DeleteMapping("/delete-student/{id}")
    public ResponseEntity<?> deleteStudentRecord(@PathVariable Long id, @RequestBody(required = false) String param) {

        // check if the student exists in database (by id)
        if (!studentDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student does not exist.");
        }

        // delete the student record
        studentDAO.deleteRecord(id);

        // return success message
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Student delted succesfully");
    }

    // get user by id
    @GetMapping("/get-student/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id, @RequestParam(required = false) String param) {

        // check if the student exists in database (by id)
        if (!studentDAO.exists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student does not exist.");
        }

        // get the student record
        Student student = studentDAO.getRecordById(id);

        // return the student record
        return ResponseEntity.status(HttpStatus.OK).body(student);
    }
}
