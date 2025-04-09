package com.example.service;

import com.example.clients.UserClient;
import com.example.dto.UserResponse;
import com.example.model.Activity;
import com.example.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserClient userClient; // Calls User Microservice

    public Activity createActivity(Long adminId, Activity activity) throws AccessDeniedException {
        UserResponse admin = userClient.getUserById(adminId);
        if (!admin.getRole().equals("ADMIN")) {
            throw new AccessDeniedException("Only admins can create activities.");
        }
        return activityRepository.save(activity);
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }
    public boolean checkActivityExists(Long id) {
        return activityRepository.existsById(id);
    }

    public Activity getActivityById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
    }

    public List<Activity> getActivitiesByLocation(String location) {
        return activityRepository.findByLocationContainingIgnoreCase(location);
    }


    public List<Activity> getActivitiesByCategory(String category) {
        return activityRepository.findByCategory(category);
    }

    public void deleteActivity(Long id, Long adminId) throws AccessDeniedException {
        UserResponse admin = userClient.getUserById(adminId);
        if (!admin.getRole().equals("ADMIN")) {
            throw new AccessDeniedException("Only admins can delete activities.");
        }
        activityRepository.deleteById(id);
    }
}
