package com.kosapp.controller;

import com.kosapp.model.User;
import com.kosapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register user (role=USER)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent() ||
            userRepository.findByEmail(user.getEmail()).isPresent()) {
            return new ResponseEntity<>("Username/email sudah terdaftar", HttpStatus.BAD_REQUEST);
        }
        user.setRole("USER");
        // (Opsional) hash password di sini
        userRepository.save(user);
        return new ResponseEntity<>("Register berhasil", HttpStatus.CREATED);
    }

    // Login user/admin
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginReq) {
        Optional<User> userOpt = userRepository.findByUsernameAndPassword(loginReq.getUsername(), loginReq.getPassword());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Jangan kirim password ke frontend
            user.setPassword("");
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Username/password salah", HttpStatus.UNAUTHORIZED);
        }
    }
} 