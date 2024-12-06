package com.cs157a.backend.dal;

import java.sql.Connection;
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
        // sql statement to insert a new admin record
        String sql = "INSERT INTO Administrators (Password, AdministratorID) VALUES (?, ?)";
        Admin a = null;
        Connection conn = null;

        try {
            conn = dbConnection.getMySqlConnection();
            conn.setAutoCommit(false);

            // execute the sql statement
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setString(1, admin.getPassword()); // set the password
                ps.setLong(2, admin.getAdminId());  // set the admin id
                ps.executeUpdate();
            }
            // commit sql transaction
            conn.commit();
            a = new Admin(admin.getAdminId(), admin.getPassword());
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    // try to roll back in case of errors
                    conn.rollback();
                } catch (SQLException re) {
                    System.err.println(re.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                try {
                    // try to roll back in case of errors
                    conn.setAutoCommit(true);
                } catch (SQLException e) {
                    System.err.println(e.getMessage());
                }
            } 
        } 
        return a;
    }
}
