package com.travel.dto;

import com.travel.model.Role;

public class AdminUserResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private boolean active;
    private String preferences;

    public AdminUserResponse(Long id, String name, String email, Role role, boolean active, String preferences) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.active = active;
        this.preferences = preferences;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public boolean isActive() { return active; }
    public String getPreferences() { return preferences; }
}
