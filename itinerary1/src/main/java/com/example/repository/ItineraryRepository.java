package com.example.repository;

import com.example.model.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    List<Itinerary> findByUserId(Long userId);
    List<Itinerary> findByDestination(String destination);
    List<Itinerary> findByUserIdAndDestination(Long userId, String destination);


}