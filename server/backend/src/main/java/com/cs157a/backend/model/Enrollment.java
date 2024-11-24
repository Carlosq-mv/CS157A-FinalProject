package com.cs157a.backend.model;

import java.time.LocalDate;

public class Enrollment {
    private Long enrollmentId;
    private Long studentId;
    private Long courseId;
    private LocalDate enrollmentDate;

    public Enrollment() {
    }

    public Enrollment(Long enrollmentId, Long studentId, Long courseId, LocalDate enrollmentDate) {
        this.enrollmentId = enrollmentId;
        this.studentId = studentId;
        this.courseId = courseId;
        this.enrollmentDate = enrollmentDate;
    }

    public Long getEnrollmentId() {
        return this.enrollmentId;
    }

    public Long getStudentId() {
        return this.studentId;
    }

    public Long getCourseId() {
        return this.courseId;
    }

    public LocalDate getEnrollmentDate() {
        return this.enrollmentDate;
    }

    public void setEnrollmentId(Long enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    @Override
    public String toString() {
        return "<EnrollmentId: " + getEnrollmentId() +
               " StudentId: " + getStudentId() +
               " CourseId: " + getCourseId() +
               " EnrollmentDate: " + getEnrollmentDate() + ">";
    }
}
