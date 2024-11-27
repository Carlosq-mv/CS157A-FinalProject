package com.cs157a.backend.dto;

import java.time.LocalDate;

public class EnrollmentDetails {
	private Long studentId;
    private Long enrollmentId;
    private String studentName;
    private String courseName;
    private int courseSection;
    private int courseCredits;
    private LocalDate enrollmentDate;

    public EnrollmentDetails() {

    }

    public EnrollmentDetails(Long studentId, Long enrollmentId, String studentName, String courseName, int courseSection, int courseCredits, LocalDate enrollmenDate) {
        this.studentId = studentId;
    	this.enrollmentId = enrollmentId;
        this.studentName = studentName;
        this.courseName = courseName;
        this.courseSection = courseSection;
        this.courseCredits = courseCredits;
        this.enrollmentDate = enrollmenDate;
    }

    public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public Long getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(Long enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public int getCourseSection() {
        return courseSection;
    }

    public void setCourseSection(int courseSection) {
        this.courseSection = courseSection;
    }

    public int getCourseCredits() {
        return courseCredits;
    }

    public void setCourseCredits(int courseCredits) {
        this.courseCredits = courseCredits;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }
}