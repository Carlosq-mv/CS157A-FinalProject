package com.cs157a.backend.dal;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cs157a.backend.config.DBConnection;
import com.cs157a.backend.dto.CourseDetails;
import com.cs157a.backend.model.Course;
import com.cs157a.backend.model.Student;

@Repository
public class CourseDAO {
    // singleton instance for database connection management
    private DBConnection dbConnection = DBConnection.getInstance();

    public List<Course> getRecords() {
        // list to store the records
        List<Course> courses = new ArrayList<>();

        // sql query
        String sql = "SELECT * FROM Courses ORDER BY Courses.CourseName, Courses.Section";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            // query results
            ResultSet resultSet = preparedStatement.executeQuery();

            // loop through the rows in result set
            while (resultSet.next()) {
                Long cId = resultSet.getLong("CourseID");
                String name = resultSet.getString("CourseName");
                int section = resultSet.getInt("Section");
                int credits = resultSet.getInt("Credits");
                courses.add(new Course(cId, name, section, credits));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return courses;
    }

    public Course getCourseByNameAndSection(String courseName, int courseSection) {
        String sql = "SELECT CourseID, CourseName, Section, Credits FROM Courses WHERE CourseName = ? AND Section = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            // Set the query parameters
            preparedStatement.setString(1, courseName);
            preparedStatement.setInt(2, courseSection);

            // Execute the query
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    // Map the result set to a Course object
                    return new Course(
                            resultSet.getLong("CourseID"),
                            resultSet.getString("CourseName"),
                            resultSet.getInt("Section"),
                            resultSet.getInt("Credits"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch course by name and section.");
        }

        // If no course is found, return null
        return null;
    }

    public void addRecord(Course course) {
        // sql statement to add a new course
        String sql = "INSERT INTO Courses (CourseName, Section, Credits) VALUES (?, ?, ?)";
        Connection conn = null;

        try {
            // Get the database connection
            conn = dbConnection.getMySqlConnection();
            conn.setAutoCommit(false);

            // execute sql statement
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                // Set query parameters
                ps.setString(1, course.getCourseName());
                ps.setInt(2, course.getSection());
                ps.setInt(3, course.getCredits());
                ps.executeUpdate();
            }

            // commit sql transaction
            conn.commit();
        } catch (SQLException e) {
            // check if there is a connection
            if (conn != null) {
                try {
                    // try to rollback transaction if error occurs
                    conn.rollback();
                } catch (SQLException re) {
                    System.err.println(re.getMessage());
                }
            }
        } finally {
            // check if there is a connection
            if (conn != null) {
                try {
                    // set autocommit to true
                    conn.setAutoCommit(true);
                } catch (SQLException e) {
                    System.err.println(e.getMessage());
                }
            }
        }
    }

    public void updateRecord(Course course) {
        // sql statement to update a course records
        String sql = "UPDATE Courses SET CourseName = ?, Section = ?, Credits = ? WHERE CourseID = ?";
        Connection conn = null;

        try {
            // initialize a database connection
            conn = dbConnection.getMySqlConnection();
            conn.setAutoCommit(false);

            try (PreparedStatement ps = dbConnection.getMySqlConnection().prepareStatement(sql)) {
                ps.setString(1, course.getCourseName());
                ps.setInt(2, course.getSection());
                ps.setInt(3, course.getCredits());
                ps.setLong(4, course.getCourseId());
                ps.executeUpdate();
            }
            // commit to database
            conn.commit();
        } catch (SQLException e) {
            // check if there is a connection
            if (conn != null) {
                try {
                    // try to rollback transaction if error occurs
                    conn.rollback();
                } catch (SQLException re) {
                    System.err.println(re.getMessage());
                }
            }
        } finally {
            // check if there is a connection
            if (conn != null) {
                try {
                    // set autocommit to true
                    conn.setAutoCommit(true);
                } catch (SQLException e) {
                    System.err.println(e.getMessage());
                }
            }
        }
    }

    public void deleteRecord(Long courseId) {
        // sql statement
        String sql = "DELETE FROM Courses WHERE CourseID = ?";
        Connection conn = null;

        try {
            conn = dbConnection.getMySqlConnection();
            conn.setAutoCommit(false);

            try (PreparedStatement ps = dbConnection.getMySqlConnection().prepareStatement(sql)) {
                ps.setLong(1, courseId);
                ps.executeUpdate();
            }

            // commit sql transaction
            conn.commit();
        } catch (SQLException e) {
            // check if there is a connection established to the database
            if (conn != null) {
                try {
                    // try to roll back transaction if an error occurs
                    conn.rollback();
                } catch (SQLException re) {
                    System.err.println(re.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                try {
                    // set auto commit back to true
                    conn.setAutoCommit(true);
                } catch (SQLException ex) {
                    System.err.println(ex.getMessage());
                }
            }
        }
    }

    public boolean exists(Long courseId) {
        // sql query
        String sql = "SELECT * FROM Courses WHERE CourseID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, courseId);

            // query results
            ResultSet resultSet = preparedStatement.executeQuery();

            // check if there was a result to the query
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public CourseDetails getRecordById(Long courseId) {
        // SQL query to fetch course details along with enrollment information
        String sql = """
            SELECT
                c.CourseID,
                c.CourseName,
                c.Section,
                c.Credits,
                s.StudentID,
                s.Name AS StudentName,
                s.Email AS StudentEmail
            FROM
                Courses c
            LEFT JOIN
                Enrollments e ON c.CourseID = e.CourseID    -- Join with Enrollments to link courses with enrollments
            LEFT JOIN
                Students s ON e.StudentID = s.StudentID     -- Join with Students to fetch student details
            WHERE
                c.CourseID = ?                              -- Fetch details for the given course ID
            ORDER BY
                e.EnrollmentDate;                           -- Order results by enrollment date (oldest to newest)
        """;

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, courseId);

            // Execute query
            ResultSet resultSet = preparedStatement.executeQuery();

            CourseDetails courseDetails = null;
            List<Student> students = new ArrayList<>();

            while (resultSet.next()) {
                // Map course details only once
                if (courseDetails == null) {
                    Long cId = resultSet.getLong("CourseID");
                    String name = resultSet.getString("CourseName");
                    int section = resultSet.getInt("Section");
                    int credits = resultSet.getInt("Credits");
                    courseDetails = new CourseDetails(cId, name, section, credits, students);
                }

                // Map student details
                Long studentId = resultSet.getLong("StudentID");
                if (studentId != 0) { // Check if student exists
                    String studentName = resultSet.getString("StudentName");
                    String studentEmail = resultSet.getString("StudentEmail");
                    students.add(new Student(studentId, studentName, studentEmail));
                }
            }

            return courseDetails;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}
