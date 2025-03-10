package com.example.clients;


import com.example.dto.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name ="USER-MICROSERVICE")
public interface UserClient {
    @GetMapping("/users/profile")
    UserResponse getUserById(@RequestParam("userId") Long userId);
}
