package com.travel.service;

import com.travel.exception.UserNotFoundException;
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
        Role assignedRole = isFirstUser ? Role.ADMIN : Role.USER;
        user.setRole(assignedRole);

        if (assignedRole == Role.ADMIN) {
            user.setPreferences(null);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String getUserPreferences(Long userId) {
        return userRepository.findById(userId)
                .map(User::getPreferences)
                .orElseThrow(() -> new UserNotFoundException("Preferences not found"));
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Page<User> getUsersPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findByRoleNot(Role.ADMIN, pageable);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User disableUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User id doesn't exist"));
        user.setActive(false);
        return userRepository.save(user); // ✅ Return updated user
    }

    public User enableUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User id doesn't exist"));
        user.setActive(true);
        return userRepository.save(user); // ✅ Return updated user
    }


    public User updateUser(Long userId, User updatedUser) {
        return userRepository.findById(userId).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPreferences(updatedUser.getPreferences());
            return userRepository.save(user);
        }).orElseThrow(() -> new UserNotFoundException("User doesn't exist"));
    }

//   public void promoteToAdmin(Long userId) {
//            User user = userRepository.findById(userId)
//                .orElseThrow(() -> new UserNotFoundException("User doesn't exist"));
//        user.setRole(Role.ADMIN);
//        userRepository.save(user);
//    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Role getRoleByUserId(Long userId) {
        return userRepository.findById(userId)
                .map(User::getRole)
                .orElseThrow(() -> new UserNotFoundException("User id doesn't exist"));
    }
}
