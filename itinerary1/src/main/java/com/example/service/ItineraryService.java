package com.example.service;

import com.example.clients.UserClient;
import com.example.dto.UserResponse;
import com.example.model.Itinerary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.repository.ItineraryRepository;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItineraryService {

    @Autowired
    private ItineraryRepository itineraryRepository;

    @Autowired
    private UserClient userServiceClient; // Calls User Microservice

    public Itinerary createItinerary(Long userId, Itinerary itinerary) throws AccessDeniedException {
        UserResponse user = (UserResponse) userServiceClient.getUserById(userId);

        if (!user.getRole().equals("USER")) {
            throw new AccessDeniedException("Only users can create itineraries.");
        }

        itinerary.setUserId(userId);
        return itineraryRepository.save(itinerary);
    }

    public Itinerary getItineraryById(Long id, Long userId) throws AccessDeniedException {
        Itinerary itinerary = itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        UserResponse user = (UserResponse) userServiceClient.getUserById(userId);

        if (!user.getRole().equals("ADMIN") && !user.getId().equals(itinerary.getUserId())) {
            throw new AccessDeniedException("Access denied.");
        }
        return itinerary;
    }

    public List<Itinerary> getItinerariesByUserId(Long userId) {
        return itineraryRepository.findByUserId(userId);
    }

    public boolean checkItineraryExists(Long id) {
        return itineraryRepository.existsById(id);
    }


    public List<Long> getUserIdsByDestination(String destination) {
        List<Itinerary> itineraries = itineraryRepository.findByDestination(destination);
        return itineraries.stream()
                .map(Itinerary::getUserId)
                .distinct() // Ensure no duplicate user IDs
                .collect(Collectors.toList());
    }
    public List<Itinerary> findItinerariesByUserIdAndDestination(Long userId, String destination) {
        return itineraryRepository.findByUserIdAndDestination(userId, destination);
    }


    public void deleteItinerary(Long id, Long userId) throws AccessDeniedException {
        Itinerary itinerary = itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        UserResponse user = (UserResponse) userServiceClient.getUserById(userId);

        if (!user.getRole().equals("ADMIN") && !user.getId().equals(itinerary.getUserId())) {
            throw new AccessDeniedException("Access denied.");
        }

        itineraryRepository.deleteById(id);
    }

    public List<Itinerary> getAllItineraries(Long adminId) throws AccessDeniedException {
        UserResponse admin = (UserResponse) userServiceClient.getUserById(adminId);
        if (!admin.getRole().equals("ADMIN")) {
            throw new AccessDeniedException("Only admins can view all itineraries.");
        }
        return itineraryRepository.findAll();
    }
}