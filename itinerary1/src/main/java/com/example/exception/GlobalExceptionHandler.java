package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;


@ControllerAdvice
class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ItineraryNotFoundException.class)
    public ErrorResponse handleItineraryNotFoundException(ItineraryNotFoundException ex) {
        return new ErrorResponse(LocalDateTime.now(), "Itinerary Not Found", ex.getMessage());
    }
}
