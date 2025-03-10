package com.example.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private Long itineraryId; // Foreign Key to Itinerary
    private Long activityId;  // Foreign Key to Activity

    @Column(nullable = false, updatable = false)
    private LocalDateTime bookingDate = LocalDateTime.now();

    @Column(nullable = false)
    private LocalTime timeSlot; // Time slot for activity

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING; // Default: Pending

    public enum Status {
        PENDING,
        CONFIRMED,
        CANCELED
    }

    // Constructors
    public Booking() {}

    public Booking(Long itineraryId, Long activityId, LocalTime timeSlot) {
        this.itineraryId = itineraryId;
        this.activityId = activityId;
        this.timeSlot = timeSlot;
    }

    // Getters and Setters
    public Long getBookingId() { return bookingId; }
    public Long getItineraryId() { return itineraryId; }
    public Long getActivityId() { return activityId; }
    public LocalTime getTimeSlot() { return timeSlot; }
    public LocalDateTime getBookingDate() { return bookingDate; }
    public Status getStatus() { return status; }

    public void setStatus(Status status) { this.status = status; }
}

