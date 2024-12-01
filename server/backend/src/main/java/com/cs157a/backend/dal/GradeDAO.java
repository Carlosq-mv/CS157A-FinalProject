package com.cs157a.backend.dal;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cs157a.backend.config.DBConnection;
import com.cs157a.backend.dto.GradingDetails;
import com.cs157a.backend.model.Grade;

@Repository
public class GradeDAO {
    private DBConnection dbConnection = DBConnection.getInstance();

    public List<Grade> getRecords() {
        // list to store all records
        List<Grade> grades = new ArrayList<>();
        // sql query to get all grade records
        String sql = "SELECT * FROM Grades";

        // execute the sql query
        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            // get the value for each tuple in resulting set
            while (resultSet.next()) {
                Long gradeId = resultSet.getLong("GradeID");
                Long enrollmentId = resultSet.getLong("EnrollmentID");
                String grade = resultSet.getString("Grade");
                LocalDate gradingDate = resultSet.getDate("GradingDate").toLocalDate();
                grades.add(new Grade(gradeId, enrollmentId, grade, gradingDate));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // return the list of grades
        return grades;
    }

    public void addRecord(Grade grade) {
        // sql statement to insert a new grade 
        String sql = "INSERT INTO Grades (EnrollmentID, Grade, GradingDate) VALUES (?, ?, '1970-01-01')";
        Connection conn = null;

        try {
            // initialize a database connection
            conn = dbConnection.getMySqlConnection();
            conn.setAutoCommit(false);

            // execute the sql statement
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, grade.getEnrollmentId());
                ps.setString(2, grade.getGrade());
                ps.executeUpdate(); 
            }
            // commit sql transaction
            conn.commit();
        } catch (SQLException e) {
            // check if there is a connection
            if (conn != null) {
                try {
                    // try to rollback transaction if an error occurs
                    conn.rollback();
                } catch (SQLException re) {
                    System.err.println(re.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                try {
                    // set auto comit back to true
                    conn.setAutoCommit(true); 
                } catch (SQLException ex) {
                    System.err.println(ex.getMessage());
                }
            }
        }
    }

    // TODO: fix this
    public void updateRecord(Grade grade) {
        // sql statement to update a 
        String sql = "UPDATE Grades SET EnrollmentID = ?, Grade = ?, GradingDate = ? WHERE GradeID = ?";
        Connection conn = null;

        try {
            // set database connection to the singleton instance
            conn = dbConnection.getMySqlConnection();
            // turn off auto commit
            conn.setAutoCommit(false);

            // execute the sql statement
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, grade.getEnrollmentId());
                ps.setString(2, grade.getGrade());
                ps.setDate(3, Date.valueOf(LocalDate.now()));
                ps.setLong(4, grade.getGradeId());
                ps.executeUpdate();  
            } 
            // commit the transaction
            conn.commit();
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    // if there is a db connection, try to rollback the state when error occurs
                    conn.rollback();
                } catch (SQLException re) {
                    System.err.println(re.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                try {
                    // turn auto commit on
                    conn.setAutoCommit(true); 
                } catch (SQLException ex) {
                    System.err.println(ex.getMessage());
                }
            }
        }
    }

    public void deleteRecord(Long gradeId) {
        // sql statement to delete a grade
        String sql = "DELETE FROM Grades WHERE GradeID = ?";
        Connection conn = null;

        try {
            // set database connection to the singleton instance
            conn = dbConnection.getMySqlConnection();
            // turn off auto commit
            conn.setAutoCommit(false);

            // execute the sql statement
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, gradeId);
                ps.executeUpdate();
            }
            // try to commit the transaction
            conn.commit();
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    // roll back in case of errors
                    conn.rollback();
                } catch (SQLException re) {
                    System.err.println(re.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                try {
                    // turn on autocommit
                    conn.setAutoCommit(true); 
                } catch (SQLException ex) {
                    System.err.println(ex.getMessage());
                }
            } 
        }
    }
   
    public List<GradingDetails> getGradeAndEnrollmentDetails(String email) {
        // list to store the tuples as objects
        List<GradingDetails> details = new ArrayList<>();

        // query that get all enrollment details plus grades for a particular student
        String sql = """
            -- Select relevant fields for enrollment and grading details of a student
            SELECT
                Students.StudentID,                    
                Enrollments.EnrollmentID,              
                Students.Name AS StudentName,         
                Courses.CourseName AS CourseName,      
                Courses.Section AS CourseSection,      
                Courses.Credits AS CourseCredits,      
                Enrollments.EnrollmentDate,           
                Grades.GradeID as GradeID,             
                Grades.Grade AS Grade,                 
                Grades.GradingDate AS GradingDate      
            FROM
                Enrollments                           
            INNER JOIN
                Students ON Enrollments.StudentID = Students.StudentID  -- Join to get student details
            INNER JOIN
                Courses ON Enrollments.CourseID = Courses.CourseID      -- Join to get course details
            LEFT JOIN
                Grades ON Enrollments.EnrollmentID = Grades.EnrollmentID -- Join to get grade details
            WHERE
                Students.Email = ?                     -- Filter to fetch details for a specific student based on their email
            ORDER BY
                Grades.Grade,
                Courses.CourseName,                    -- Order results alphabetically by course name
                Courses.Section;                       -- Then order by section within the same course
        """;

        // execute the sql statement
        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setString(1, email);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                GradingDetails enrollmentDetails = new GradingDetails();

                // extract data from the ResultSet
                enrollmentDetails.setStudentId(resultSet.getLong("StudentID"));
                enrollmentDetails.setEnrollmentId(resultSet.getLong("EnrollmentID"));
                enrollmentDetails.setStudentName(resultSet.getString("StudentName"));
                enrollmentDetails.setCourseName(resultSet.getString("CourseName"));
                enrollmentDetails.setCourseSection(resultSet.getInt("CourseSection"));
                enrollmentDetails.setCourseCredits(resultSet.getInt("CourseCredits"));
                enrollmentDetails.setEnrollmentDate(resultSet.getDate("EnrollmentDate").toLocalDate());
                enrollmentDetails.setGradeId(resultSet.getLong("GradeID"));
                enrollmentDetails.setGrade(resultSet.getString("Grade")); 
                enrollmentDetails.setGradingDate(resultSet.getDate("GradingDate").toLocalDate());

                // add to the list
                details.add(enrollmentDetails);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return details;
    }


    public boolean exists(Long gradeId) {
        String sql = "SELECT * FROM Grades WHERE GradeID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, gradeId);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public Grade getRecordById(Long gradeId) {
        String sql = "SELECT * FROM Grades WHERE GradeID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, gradeId);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                Long gId = resultSet.getLong("GradeID");
                Long enrollmentId = resultSet.getLong("EnrollmentID");
                String grade = resultSet.getString("Grade");
                LocalDate gradingDate = resultSet.getDate("GradingDate").toLocalDate();
                return new Grade(gId, enrollmentId, grade, gradingDate);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
