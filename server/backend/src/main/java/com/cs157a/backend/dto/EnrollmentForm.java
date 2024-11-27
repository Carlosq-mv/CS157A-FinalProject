package com.cs157a.backend.dto;

public class EnrollmentForm {
	private Long studentId;
	private String courseName;
	private int courseSection;
	
	public EnrollmentForm(Long studentId, String courseName, int courseSection) {
		this.studentId = studentId;
		this.courseName = courseName;
		this.courseSection = courseSection;
	}
	
	public Long getStudentId() {
		return studentId;
	}
	public void setStudentId(Long studentId) {
		this.studentId = studentId;
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
	
	
}
