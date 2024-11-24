package com.cs157a.backend.dal;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cs157a.backend.config.DBConnection;
import com.cs157a.backend.model.Enrollment;

@Repository
public class EnrollmentDAO {
    // singleton instance for database connection management
    private DBConnection dbConnection = DBConnection.getInstance();

    // Retrieve all enrollments
    public List<Enrollment> getRecords() {
        List<Enrollment> enrollments = new ArrayList<>();
        String sql = "SELECT * FROM Enrollments";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Long enrollmentId = resultSet.getLong("EnrollmentID");
                Long studentId = resultSet.getLong("StudentID");
                Long courseId = resultSet.getLong("CourseID");
                LocalDate enrollmentDate = resultSet.getDate("EnrollmentDate").toLocalDate();

                enrollments.add(new Enrollment(enrollmentId, studentId, courseId, enrollmentDate));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return enrollments;
    }

    // Add a new enrollment
    public void addRecord(Enrollment enrollment) {
        String sql = "INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate) VALUES (?, ?, ?)";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollment.getStudentId());
            preparedStatement.setLong(2, enrollment.getCourseId());
            preparedStatement.setDate(3, java.sql.Date.valueOf(enrollment.getEnrollmentDate()));
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Update an existing enrollment
    public void updateRecord(Enrollment enrollment) {
        String sql = "UPDATE Enrollments SET StudentID = ?, CourseID = ?, EnrollmentDate = ? WHERE EnrollmentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollment.getStudentId());
            preparedStatement.setLong(2, enrollment.getCourseId());
            preparedStatement.setDate(3, java.sql.Date.valueOf(enrollment.getEnrollmentDate()));
            preparedStatement.setLong(4, enrollment.getEnrollmentId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Delete an enrollment
    public void deleteRecord(Long enrollmentId) {
        String sql = "DELETE FROM Enrollments WHERE EnrollmentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollmentId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Check if an enrollment exists
    public boolean exists(Long enrollmentId) {
        String sql = "SELECT * FROM Enrollments WHERE EnrollmentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollmentId);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Retrieve a single enrollment by ID
    public Enrollment getRecordById(Long enrollmentId) {
        String sql = "SELECT * FROM Enrollments WHERE EnrollmentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollmentId);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                Long eId = resultSet.getLong("EnrollmentID");
                Long studentId = resultSet.getLong("StudentID");
                Long courseId = resultSet.getLong("CourseID");
                LocalDate enrollmentDate = resultSet.getDate("EnrollmentDate").toLocalDate();

                return new Enrollment(eId, studentId, courseId, enrollmentDate);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
