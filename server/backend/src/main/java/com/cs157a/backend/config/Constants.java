package com.cs157a.backend.config;


public class Constants {
    public final static String ADMIN_TABLE = """
        CREATE TABLE IF NOT EXISTS Administrators (
            AdministratorID BIGINT AUTO_INCREMENT PRIMARY KEY,
            Password VARCHAR(255) NOT NULL
        );
    """;

    public final static String STUDENTS_TABLE = """
        CREATE TABLE IF NOT EXISTS Students (
            StudentID BIGINT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(100) NOT NULL,
            DateOfBirth DATE NOT NULL,
            Email VARCHAR(100) UNIQUE NOT NULL,
            Phone VARCHAR(15) NOT NULL
        );
    """;

    public final static String COURSES_TABLE = """
        CREATE TABLE IF NOT EXISTS Courses (
            CourseID BIGINT AUTO_INCREMENT PRIMARY KEY,
            CourseName VARCHAR(100) NOT NULL,
            Section INT NOT NULL,
            Credits BIGINT  NOT NULL
        );
    """;

    public final static String ENROLLMENTS_TABLE = """
        CREATE TABLE IF NOT EXISTS Enrollments (
            EnrollmentID BIGINT AUTO_INCREMENT PRIMARY KEY,
            StudentID BIGINT NOT NULL,
            CourseID BIGINT NOT NULL,
            EnrollmentDate DATE NOT NULL,
            FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
            FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
        );
    """;

    public final static String GRADES_TABLE = """
        CREATE TABLE IF NOT EXISTS Grades (
            GradeID BIGINT AUTO_INCREMENT PRIMARY KEY,
            EnrollmentID BIGINT NOT NULL,
            Grade VARCHAR(2) NOT NULL,
            GradingDate DATE NOT NULL,
            FOREIGN KEY (EnrollmentID) REFERENCES Enrollments(EnrollmentID)
        );
    """; 
}
