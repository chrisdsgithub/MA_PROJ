package com.travel3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@SpringBootApplication
@EnableDiscoveryClient
public class TripsyncGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripsyncGatewayApplication.class, args);
	}



}
