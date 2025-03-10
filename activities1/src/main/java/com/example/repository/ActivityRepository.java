package com.example.repository;

import com.example.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByLocation(String location);
    List<Activity> findByCategory(String category);
}
