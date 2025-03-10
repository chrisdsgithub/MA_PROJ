package com.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingResponse {
    private Long bookingId;
    private Long itineraryId;
    private Long activityId;
    private String timeSlot;
    private String status;
}
