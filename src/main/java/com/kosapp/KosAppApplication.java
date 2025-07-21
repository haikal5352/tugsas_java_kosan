package com.kosapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.kosapp.controller", "com.kosapp.service", "com.kosapp.repository", "com.kosapp.config"})
@EntityScan("com.kosapp.model")
@EnableJpaRepositories("com.kosapp.repository")
public class KosAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(KosAppApplication.class, args);
    }
} 