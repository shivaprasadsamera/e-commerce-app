package com.ecommerce.backend.controller;

import com.ecommerce.backend.service.UserService;
import com.ecommerce.backend.entity.User;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void initRolesAndUsers() {
        userService.initRolesAndUser();
    }


    @PostMapping("/registerNewUser")
    public User registerNewUser(@RequestBody User user) {
        return userService.registerNewUser(user);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/forAdmin")
    public String forAdmin() {
        return "This URL is accessible for admin only!";
    }

    @PreAuthorize("hasRole('User')")
    @GetMapping("/forUser")
    public String forUser() {
        return "This URL is accessible for user only!";
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

}
