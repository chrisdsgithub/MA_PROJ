package com.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {
    private String email;
    private String destination;
    private Long itineraryId;  // Optional (user selects if multiple exist)
    private Long activityId;
    private String timeSlot;
}
