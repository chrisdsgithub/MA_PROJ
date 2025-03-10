package com.example.controller;


import com.example.dto.BookingRequest;
import com.example.model.Booking;
import com.example.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest request) throws Exception {
        return bookingService.createBooking(request);
    }

    @DeleteMapping("/{bookingId}")
    public String cancelBooking(@PathVariable Long bookingId, @RequestParam String email) throws Exception {
        bookingService.cancelBooking(bookingId, email);
        return "Booking canceled successfully";
    }

    @GetMapping("/history")
    public List<Booking> getUserBookings(@RequestParam String email) throws Exception {
        return bookingService.getUserBookings(email);
    }
}
