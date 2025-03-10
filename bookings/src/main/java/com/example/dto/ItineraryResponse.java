package com.example.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItineraryResponse {
    private Long itineraryId;
    private Long userId;
    private String destination;
    private String startDate;
    private String endDate;
    private String status; // PLANNED, IN PROGRESS, COMPLETED
}
