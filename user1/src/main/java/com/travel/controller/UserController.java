package com.travel.controller;

import com.travel.dto.UserResponse;
import com.travel.model.User;
import com.travel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    @GetMapping("/profile")
    public ResponseEntity<?> getUserById(@RequestParam Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUser(@RequestParam Long userId, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(userId, user));
    }

    @GetMapping("/email/{email}")
    public UserResponse getUserByEmail(@PathVariable String email) {
        Optional<User> userOptional = userService.getUserByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }

        User user = userOptional.get();
        return new UserResponse(user.getUserId(), user.getName(), user.getEmail());
    }


    @GetMapping("/{id}/preferences")
    public ResponseEntity<String> getUserPreferences(@PathVariable Long id) {
        String preferences = userService.getUserPreferences(id);
        if (preferences != null) {
            return ResponseEntity.ok(preferences);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}

