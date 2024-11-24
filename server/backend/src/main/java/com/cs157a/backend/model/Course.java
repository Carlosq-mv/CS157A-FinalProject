package com.cs157a.backend.model;

public class Course {
    private Long courseId;
    private String courseName;
    private int section;
    private int credits;

    public Course() {
    }

    public Course(Long courseId, String courseName, int section, int credits) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.section = section;
        this.credits = credits;
    }

    public Long getCourseId() {
        return this.courseId;
    }

    public String getCourseName() {
        return this.courseName;
    }

    public int getSection() {
        return this.section;
    }

    public int getCredits() {
        return this.credits;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setSection(int section) {
        this.section = section;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    @Override
    public String toString() {
        return "<CourseId: " + getCourseId() +
               " CourseName: " + getCourseName() +
               " Section: " + getSection() +
               " Credits: " + getCredits() + ">";
    }
}
