package com.example.controller;

import com.example.model.Itinerary;
import com.example.service.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/itineraries")
public class ItineraryController {
    @Autowired
    private ItineraryService itineraryService;

    @PostMapping("/create/{userId}")
    public Itinerary createItinerary(@PathVariable Long userId, @RequestBody Itinerary itinerary) throws AccessDeniedException {
        return itineraryService.createItinerary(userId, itinerary);
    }

    @GetMapping("/{id}")
    public Itinerary getItineraryById(@PathVariable Long id, @RequestParam Long userId) throws AccessDeniedException {
        return itineraryService.getItineraryById(id, userId);
    }

    @GetMapping("/user/{userId}")
    public List<Itinerary> getItinerariesByUserId(@PathVariable Long userId) {
        return itineraryService.getItinerariesByUserId(userId);
    }

    @GetMapping("/user/{userId}/{destination}")
    public List<Itinerary> getItinerariesByUserAndDestination(
            @PathVariable Long userId, @PathVariable String destination) {
        return itineraryService.findItinerariesByUserIdAndDestination(userId, destination);
    }


    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> checkItineraryExists(@PathVariable Long id) {
        boolean exists = itineraryService.checkItineraryExists(id);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/users/{destination}")
    public List<Long> getUserIdsByDestination(@PathVariable String destination) {
        return itineraryService.getUserIdsByDestination(destination);
    }

    @DeleteMapping("/{id}")
    public String deleteItinerary(@PathVariable Long id, @RequestParam Long userId) throws AccessDeniedException {
        itineraryService.deleteItinerary(id, userId);
        return "Itinerary deleted successfully.";
    }

    @GetMapping("/admin/{adminId}")
    public List<Itinerary> getAllItineraries(@PathVariable Long adminId) throws AccessDeniedException {
        return itineraryService.getAllItineraries(adminId);
    }
}
