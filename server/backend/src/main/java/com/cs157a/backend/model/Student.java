package com.cs157a.backend.model;

import java.time.LocalDate;

public class Student {
    private Long studentId;
    private String name;
    private LocalDate dateOfBirth;
    private String email;
    private String phoneNum;

    public Student() {
    }

    public Student(Long studentId, String name, LocalDate dateOfBirth, String email, String phoneNum) {
        this.studentId = studentId;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNum = phoneNum;
    }

    public Long getStudentId() {
        return this.studentId;
    }

    public String getName() {
        return this.name;
    }

    public LocalDate getDateOfBirth() {
        return this.dateOfBirth;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPhoneNum() {
        return this.phoneNum;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    @Override
    public String toString() {
        return "<StudentId: " + getStudentId() + 
               " Name: " + getName() + 
               " DateOfBirth: " + getDateOfBirth() + 
               " Email: "  + getEmail() + 
               " Phone: " + getPhoneNum() + ">";
    }
}
