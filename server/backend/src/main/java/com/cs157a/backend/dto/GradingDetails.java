package com.cs157a.backend.dto;

import java.time.LocalDate;

public class GradingDetails extends EnrollmentDetails {
    private Long gradeId;
    private String grade;
    private LocalDate gradingDate;

    public GradingDetails() {
        
    }

    public GradingDetails(Long studentId, Long enrollmentId, String studentName, String courseName,
            int courseSection, int courseCredits, LocalDate enrollmentDate, Long gradeId,
            String grade, LocalDate gradingDate) {
        super(studentId, enrollmentId, studentName, courseName, courseSection, courseCredits, enrollmentDate);
        this.gradeId = gradeId;
        this.grade = grade;
        this.gradingDate = gradingDate;
    }

    // Getters and Setters for new fields
    public Long getGradeId() {
        return this.gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
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

}
