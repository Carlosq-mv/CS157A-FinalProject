package com.cs157a.backend.model;

import java.time.LocalDate;

public class Grade {
    private Long gradeId;
    private Long enrollmentId;
    private String grade;
    private LocalDate gradingDate;

    public Grade() {
    }

    public Grade(Long gradeId, Long enrollmentId, String grade, LocalDate gradingDate) {
        this.gradeId = gradeId;
        this.enrollmentId = enrollmentId;
        this.grade = grade;
        this.gradingDate = gradingDate;
    }

    public Long getGradeId() {
        return this.gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
    }

    public Long getEnrollmentId() {
        return this.enrollmentId;
    }

    public void setEnrollmentId(Long enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public String getGrade() {
        return this.grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public LocalDate getGradingDate() {
        return this.gradingDate;
    }

    public void setGradingDate(LocalDate gradingDate) {
        this.gradingDate = gradingDate;
    }

    @Override
    public String toString() {
        return "<GradeID: " + getGradeId() + 
               ", EnrollmentID: " + getEnrollmentId() + 
               ", Grade: " + getGrade() + 
               ", GradingDate: " + getGradingDate() + ">";
    }
}
