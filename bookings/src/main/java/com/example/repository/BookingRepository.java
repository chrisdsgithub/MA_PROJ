package com.example.repository;

import com.example.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalTime;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByItineraryIdAndActivityIdAndTimeSlot(Long itineraryId, Long activityId, LocalTime timeSlot);
}
