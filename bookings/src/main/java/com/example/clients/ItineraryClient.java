package com.example.clients;
import com.example.dto.ItineraryResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "itinerary-microservice")
public interface ItineraryClient {
    @GetMapping("/itineraries/{id}/exists")
    Boolean checkItineraryExists(@PathVariable Long id);

    @GetMapping("/itineraries/user/{userId}/{destination}")
    List<ItineraryResponse> getItinerariesByUserAndDestination(@PathVariable Long userId, @PathVariable String destination);

    @GetMapping("/itineraries/user/{userId}")
    List<Long> getItinerariesByUserId(@PathVariable Long userId);
}
