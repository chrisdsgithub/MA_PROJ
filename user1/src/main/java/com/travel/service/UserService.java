package com.travel.service;

import com.travel.model.Role;
import com.travel.model.User;
import com.travel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;
    public User registerUser(User user) {
        boolean isFirstUser = userRepository.count() == 0;

        // Assign role based on whether it's the first user or not
        Role assignedRole = isFirstUser ? Role.ADMIN : Role.USER;
        user.setRole(assignedRole);

        // Remove preferences for admin users
        if (assignedRole == Role.ADMIN) {
            user.setPreferences(null);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public String getUserPreferences(Long userId) {
        return userRepository.findById(userId)
                .map(User::getPreferences)  // Assuming User entity has `getPreferences()`
                .orElse(null);
    }


    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }


    public Page<User> getUsersPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findByRoleNot(Role.ADMIN, pageable);    }


    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public String disableUser(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setActive(false);
            userRepository.save(user);
            return "User account disabled successfully.";
        }
        return "User not found.";
    }

    public User updateUser(Long userId, User updatedUser) {
        return userRepository.findById(userId).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPreferences(updatedUser.getPreferences());
            return userRepository.save(user);
        }).orElse(null);
    }

    public void promoteToAdmin(Long userId) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setRole(Role.ADMIN);
            userRepository.save(user);
        });
    }

    public String enableUser(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setActive(true);
            userRepository.save(user);
            return "User account enabled successfully.";
        }
        return "User not found.";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll(); // Assuming you have UserRepository
    }


    public Role getRoleByUserId(Long userId) {
        return userRepository.findById(userId).map(User::getRole).orElse(null);
    }



}