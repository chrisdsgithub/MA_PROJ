package com.example.controller;

import com.example.model.Activity;
import com.example.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/activities")
public class ActivityController {
    @Autowired
    private ActivityService activityService;

    // ✅ Admin Only: Create a new activity
    @PostMapping
    public Activity createActivity(@RequestParam Long adminId, @RequestBody Activity activity) throws AccessDeniedException {
        return activityService.createActivity(adminId, activity);
    }

    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> checkActivityExists(@PathVariable Long id) {
        boolean exists = activityService.checkActivityExists(id);
        return ResponseEntity.ok(exists);
    }

    // ✅ All Users: Get all activities
    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    // ✅ All Users: Get activity by ID
    @GetMapping("/{id}")
    public Activity getActivityById(@PathVariable Long id) {
        return activityService.getActivityById(id);
    }

    // ✅ All Users: Get activities by location
    @GetMapping("/location/{location}")
    public List<Activity> getActivitiesByLocation(@PathVariable String location) {
        return activityService.getActivitiesByLocation(location);
    }

    // ✅ All Users: Get activities by category
    @GetMapping("/category/{category}")
    public List<Activity> getActivitiesByCategory(@PathVariable String category) {
        return activityService.getActivitiesByCategory(category);
    }

    // ✅ Admin Only: Delete an activity
    @DeleteMapping("/{id}")
    public void deleteActivity(@PathVariable Long id, @RequestParam Long adminId) throws AccessDeniedException {
        activityService.deleteActivity(id, adminId);
    }
}
