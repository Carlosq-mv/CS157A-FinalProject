package com.cs157a.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    WebMvcConfigurer corsSetup() {
        return new WebMvcConfigurer() {

            @SuppressWarnings("null")
            @Override
            public void addCorsMappings(CorsRegistry r) {
                assert r != null;
                r.addMapping("/**")
                    .allowedOrigins("http://localhost:5173")  // cors endpoints
                    .allowedMethods("GET", "POST", "PUT", "DELETE") // HTTP methods allowed
                    .allowedHeaders("*") // allow all headers
                    .allowCredentials(true); // for cookies 
            }
        };
    }
}
 
