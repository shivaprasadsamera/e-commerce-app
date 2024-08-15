package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.ContactForm;
import com.ecommerce.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/submitContactForm")
    public ResponseEntity<ContactForm> submitContactForm(@RequestBody ContactForm contactForm) {
        ContactForm savedForm = contactService.saveContactForm(contactForm);
        return ResponseEntity.ok(savedForm);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/getAllContactForms")
    public ResponseEntity<List<ContactForm>> getAllContactForms() {
        List<ContactForm> contactForms = contactService.getAllContactForms();
        return ResponseEntity.ok(contactForms);
    }
}
