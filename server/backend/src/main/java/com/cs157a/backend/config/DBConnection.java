package com.cs157a.backend.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConnection {
    private static DBConnection dbConnection = new DBConnection();
    private Connection mySqlConnection;

    private DBConnection() {
        mySqlConnection = connect();
    }

    public static DBConnection getInstance() {
        return dbConnection;
    }

    public Connection getMySqlConnection() {
        return mySqlConnection;
    }

    // create a connection to MySql
    private Connection connect() {
        try {
            return DriverManager.getConnection("jdbc:mysql://localhost:3306/StudentManagementSyst", "root",
                    "Mar89Sixers402#");
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // create tables
    public void DBInit() {
        createTable(Constants.ADMIN_TABLE);      
        createTable(Constants.STUDENTS_TABLE);    
        createTable(Constants.COURSES_TABLE);    
        createTable(Constants.ENROLLMENTS_TABLE); 
        createTable(Constants.GRADES_TABLE);     
    }

    private void createTable(String sql) {
        try (Statement statement = getMySqlConnection().createStatement()) {
            statement.execute(sql);
        } catch (SQLException e) {
            System.err.println("error creating table: " + e.getMessage());
        }
    }

}
