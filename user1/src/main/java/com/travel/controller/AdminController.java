package com.travel.controller;

import com.travel.model.Role;
import com.travel.model.User;
import com.travel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/paged")
    public Page<User> getUsersPaged(@RequestParam int page, @RequestParam int size) {
        return userService.getUsersPaged(page, size);
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

    @GetMapping("/{id}/exists")
    public ResponseEntity<Void> checkUserExists(@PathVariable Long id) {
        return userService.getUserById(id).isPresent() ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/role/{userId}")
    public ResponseEntity<?> getUserRole(@PathVariable Long userId) {
        Role role = userService.getRoleByUserId(userId);
        return role != null ? ResponseEntity.ok(role) : ResponseEntity.notFound().build();
    }

    @PutMapping("/promote/{userId}")
    public ResponseEntity<?> promoteUser(@PathVariable Long userId) {
        userService.promoteToAdmin(userId);
        return ResponseEntity.ok("User promoted to ADMIN.");
    }

    @PutMapping("/enable/{userId}")
    public ResponseEntity<?> enableUser(@PathVariable Long userId) {
        userService.enableUser(userId);
        return ResponseEntity.ok("User enabled.");
    }

    @PutMapping("/disable/{userId}")
    public ResponseEntity<?> disableUser(@PathVariable Long userId) {
        userService.disableUser(userId);
        return ResponseEntity.ok("User disabled.");
    }
}
