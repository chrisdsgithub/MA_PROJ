package com.example.clients;

import com.example.dto.UserResponse;
import com.example.model.UserRole;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-microservice")
public interface UserClient {
    @GetMapping("/users/role/{id}")
    UserRole getRole(@PathVariable Long id);

    @GetMapping("/users/email/{email}")
    UserResponse getUserByEmail(@PathVariable String email);


}
