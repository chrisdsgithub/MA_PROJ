package com.example.service;

import com.example.clients.UserClient;
import com.example.clients.ItineraryClient;
import com.example.clients.ActivityClient;
import com.example.dto.BookingRequest;
import com.example.dto.ItineraryResponse;
import com.example.dto.UserResponse;
import com.example.model.Booking;
import com.example.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserClient userClient;

    @Autowired
    private ItineraryClient itineraryClient;

    @Autowired
    private ActivityClient activityClient;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking createBooking(BookingRequest request) throws Exception {
        // Fetch user details using email
        System.out.println("Fetching user by email: " + request.getEmail());
        UserResponse user = userClient.getUserByEmail(request.getEmail());
        System.out.println("User Response: " + user);

        if (user == null) {
            throw new Exception("User not found.");
        }


        System.out.println("User ID: " + user.getId());
        System.out.println("Destination: " + request.getDestination());


        // Fetch itineraries using ItineraryResponse DTO
        List<ItineraryResponse> itineraries = itineraryClient.getItinerariesByUserAndDestination(user.getId(), request.getDestination());
        if (itineraries.isEmpty()) {
            throw new Exception("No itineraries found for this user in the given destination.");
        }

        // Select itinerary (if multiple exist, user must specify)
        Long selectedItineraryId = (request.getItineraryId() != null) ? request.getItineraryId() : itineraries.get(0).getItineraryId();

        // Check if activity exists
        if (!activityClient.checkActivityExists(request.getActivityId())) {
            throw new Exception("Activity does not exist.");
        }

        // Check if the activity is already booked at the requested time
        Optional<Booking> existingBooking = bookingRepository.findByItineraryIdAndActivityIdAndTimeSlot(
                selectedItineraryId, request.getActivityId(), LocalTime.parse(request.getTimeSlot()));

        if (existingBooking.isPresent()) {
            throw new Exception("This activity is already booked at the selected time.");
        }

        // Create new booking
        Booking newBooking = new Booking();
        newBooking.setItineraryId(selectedItineraryId);
        newBooking.setActivityId(request.getActivityId());
        newBooking.setTimeSlot(LocalTime.parse(request.getTimeSlot()));
        newBooking.setStatus(Booking.Status.PENDING);
        newBooking.setBookingDate(LocalDateTime.now());

        return bookingRepository.save(newBooking);
    }


    public List<ItineraryResponse> getUserItineraries(String email, String destination) throws Exception {
        // Fetch userId from User Service using email
        UserResponse user = userClient.getUserByEmail(email);
        if (user == null) {
            throw new Exception("User not found.");
        }

        // Fetch itineraries from Itinerary Service
        List<ItineraryResponse> itineraries = itineraryClient.getItinerariesByUserAndDestination(user.getId(), destination);
        if (itineraries.isEmpty()) {
            throw new Exception("No itineraries found for this user in the given destination.");
        }

        return itineraries;
    }
    public void cancelBooking(Long bookingId, String email) throws Exception {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new Exception("Booking not found."));

        UserResponse user = userClient.getUserByEmail(email);

        if (!booking.getStatus().equals(Booking.Status.PENDING)) {
            throw new Exception("Only pending bookings can be canceled.");
        }

        bookingRepository.deleteById(bookingId);
    }

    public List<Booking> getUserBookings(String email) throws Exception {
        UserResponse user = userClient.getUserByEmail(email);
        return bookingRepository.findAll();
    }
}
