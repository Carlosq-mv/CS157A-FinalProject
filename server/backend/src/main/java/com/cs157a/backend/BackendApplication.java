package com.cs157a.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cs157a.backend.config.DBConnection;

// Root application
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

		// Initialize database tables
		DBConnection dbConnection = DBConnection.getInstance();
		dbConnection.DBInit();
	}

}
