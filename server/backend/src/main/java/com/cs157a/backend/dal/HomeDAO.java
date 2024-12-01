package com.cs157a.backend.dal;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cs157a.backend.config.DBConnection;

@Repository
public class HomeDAO {
    private DBConnection dbConnection = DBConnection.getInstance();

    private final List<String> validTables = Arrays.asList("Students", "Enrollments", "Courses", "Grades");

    public int getDetails(String table) {
        if (validTables.contains(table.toLowerCase())) {
            throw new IllegalArgumentException("Table: <" + table + "> DNE");
        }

        String sql = "SELECT COUNT(*) FROM " + table;
        int count = 0;

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();

            // check if resulting query has rows
            if (resultSet.next()) {
                count = resultSet.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        if (count == 0) {
            throw new RuntimeException("Table: <" + table + "> is empty.");
        }
        return count;
    }
}
