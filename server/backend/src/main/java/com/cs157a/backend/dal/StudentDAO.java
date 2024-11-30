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
import com.cs157a.backend.model.Student;

@Repository
public class StudentDAO {
    // singleton instance for database connection management
    private DBConnection dbConnection = DBConnection.getInstance();

    public List<Student> getRecords() {
        // list to store the records
        List<Student> students = new ArrayList<>();

        // sql query
        String sql = "SELECT * FROM Students";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            // query results
            ResultSet resultSet = preparedStatement.executeQuery();

            // loop through the rows in result set
            while (resultSet.next()) {
                Long sId = resultSet.getLong("StudentID");
                String name = resultSet.getString("Name");
                LocalDate dob = resultSet.getDate("DateOfBirth").toLocalDate();
                String email = resultSet.getString("Email");
                String phoneNum = resultSet.getString("Phone");
                students.add(new Student(sId, name, dob, email, phoneNum));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return students;
    }

    public void addRecord(Student student) {
        // sql query
        String sql = "INSERT INTO Students (Name, DateOfBirth, Email, Phone) VALUES (?, ?, ?, ?)";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setString(1, student.getName());
            preparedStatement.setDate(2, Date.valueOf(student.getDateOfBirth()));
            preparedStatement.setString(3, student.getEmail());
            preparedStatement.setString(4, student.getPhoneNum());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateRecord(Student student) {
        // sql query
        String sql = "UPDATE Students SET Name = ?, DateOfBirth = ?, Email = ?, Phone = ? WHERE StudentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setString(1, student.getName());
            preparedStatement.setDate(2, Date.valueOf(student.getDateOfBirth()));
            preparedStatement.setString(3, student.getEmail());
            preparedStatement.setString(4, student.getPhoneNum());
            preparedStatement.setLong(5, student.getStudentId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteRecord(Long studentId) {
        // sql query
        String sql = "DELETE FROM Students WHERE StudentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, studentId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean isDuplicate(Student student) {
        // sql query
        String sql = "SELECT COUNT(*) FROM Students WHERE Email = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setString(1, student.getEmail());
            ResultSet resultSet = preparedStatement.executeQuery();

            // check if resulting query has rows
            if (resultSet.next()) {
                // get count from the first column in resulting query
                int count = resultSet.getInt(1);
                // if greater than 0, there is a duplicate
                return count > 0;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean exists(Long studentId) {
        // sql query
        String sql = "SELECT * FROM Students WHERE StudentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, studentId);

            // query results
            ResultSet resultSet = preparedStatement.executeQuery();

            // check if there was a result to the query
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean exists(String email) {
        // sql query
        String sql = "SELECT * FROM Students WHERE Email = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setString(1, email);

            // query results
            ResultSet resultSet = preparedStatement.executeQuery();

            // check if there was a result to the query
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public Student getRecordById(Long studentId) {
        // sql query
        String sql = "SELECT * FROM Students WHERE StudentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, studentId);

            // execute query
            ResultSet resultSet = preparedStatement.executeQuery();

            // Check if a result is found
            if (resultSet.next()) {
                // map results to a Student obj
                Long sId = resultSet.getLong("StudentID");
                String name = resultSet.getString("Name");
                LocalDate dob = resultSet.getDate("DateOfBirth").toLocalDate();
                String email = resultSet.getString("Email");
                String phoneNum = resultSet.getString("Phone");

                // return the Student obj
                return new Student(sId, name, dob, email, phoneNum);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

}
