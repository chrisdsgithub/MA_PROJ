package com.example.dto;


public class UserResponse {
    private Long id;
    private String name;
    private String email;

    // Constructors
    public UserResponse() {}

    public UserResponse(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }

    @Override
    public String toString() {
        return "UserResponse{id=" + id + ", name='" + name + "', email='" + email + "'}";
    }
}
