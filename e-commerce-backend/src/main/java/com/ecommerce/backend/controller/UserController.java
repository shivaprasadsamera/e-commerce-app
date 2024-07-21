package com.ecommerce.backend.controller;

import com.ecommerce.backend.service.UserService;
import com.ecommerce.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRolesAndUsers(){
        userService.initRolesAndUser();
    }

    @PostMapping("/registerNewUser")
    public User registerNewUser(@RequestBody User user){
        return userService.registerNewUser(user);
    }

    @GetMapping("/forAdmin")
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is accessible for admin only!";
    }

    @GetMapping("/forUser")
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is accessible for user only!";
    }

}
