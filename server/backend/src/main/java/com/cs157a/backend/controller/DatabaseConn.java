package com.cs157a.backend.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

// NOTE: chatgpt code to check if the databse is connected (delete later)
@Service
public class DatabaseConn {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseConn(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean isDatabaseConnected() {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
