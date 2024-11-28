package com.cs157a.backend.dal;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Repository;

import com.cs157a.backend.config.DBConnection;
import com.cs157a.backend.model.Admin;

@Repository
public class AdminDAO {
    // singleton instance for database connection management
    private DBConnection dbConnection = DBConnection.getInstance();

    public Admin getAdmin(Long adminId) {
        // sql query
        String sql = "SELECT * FROM Administrators WHERE AdministratorID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, adminId);

            // query results
            ResultSet resultSet = preparedStatement.executeQuery();

            // check if there was a result to the query
            if (resultSet.next()) {
                // create an Admin object and return it
                return new Admin(resultSet.getLong("AdministratorID"), resultSet.getString("Password"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Admin createAdmin(Admin admin) {
        // sql query
        String sql = "INSERT INTO Administrators (Password, AdministratorID) VALUES (?, ?)";
        Admin a;
        try (PreparedStatement stmt = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            stmt.setString(1, admin.getPassword()); // Set the password
            stmt.setLong(2, admin.getAdminId()); // Set the username
            stmt.executeUpdate();
            a = new Admin(admin.getAdminId(), admin.getPassword());
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return a;
    }

}
