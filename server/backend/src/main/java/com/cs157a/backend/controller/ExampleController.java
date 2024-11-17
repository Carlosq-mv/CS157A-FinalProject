package com.cs157a.backend.controller;

// import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Spring REST Controller
@RequestMapping("/api") // Base url for all endpoints in this controller e.g., /api/hello
public class ExampleController {

    // HTTP GET request for /api/hello
    @GetMapping("/hello")
    public String greet() {
        // Just return string value "Hello, World"
        return "Hello, World!";

        // NOTE: can optionally make it json but return type needs to be Map<String, String>
        // return Map.of("message", "Hello, World!");
    }


    // NOTE: This is chatgpt code to check if database is connected (will delete later)
    private final DatabaseConn databaseCheckService;

    public ExampleController(DatabaseConn databaseCheckService) {
        this.databaseCheckService = databaseCheckService;
    }

    @GetMapping("/db")
    public String checkDatabase() {
        return databaseCheckService.isDatabaseConnected() ? "Database is connected!" : "Database connection failed!";
    }
}
