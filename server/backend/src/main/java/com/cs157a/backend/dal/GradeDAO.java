package com.cs157a.backend.dal;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cs157a.backend.config.DBConnection;
import com.cs157a.backend.model.Grade;

@Repository
public class GradeDAO {
    private DBConnection dbConnection = DBConnection.getInstance();

    public List<Grade> getRecords() {
        List<Grade> grades = new ArrayList<>();
        String sql = "SELECT * FROM Grades";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();
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
        return grades;
    }

    public void addRecord(Grade grade) {
        String sql = "INSERT INTO Grades (EnrollmentID, Grade, GradingDate) VALUES (?, ?, ?)";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, grade.getEnrollmentId());
            preparedStatement.setString(2, grade.getGrade());
            preparedStatement.setDate(3, Date.valueOf(grade.getGradingDate()));
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateRecord(Grade grade) {
        String sql = "UPDATE Grades SET EnrollmentID = ?, Grade = ?, GradingDate = ? WHERE GradeID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, grade.getEnrollmentId());
            preparedStatement.setString(2, grade.getGrade());
            preparedStatement.setDate(3, Date.valueOf(grade.getGradingDate()));
            preparedStatement.setLong(4, grade.getGradeId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteRecord(Long gradeId) {
        String sql = "DELETE FROM Grades WHERE GradeID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, gradeId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
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
