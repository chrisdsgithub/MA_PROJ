package com.example.clients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "activity-microservice")
public interface ActivityClient {
    @GetMapping("/activities/{id}/exists")
    Boolean checkActivityExists(@PathVariable Long id);
}
