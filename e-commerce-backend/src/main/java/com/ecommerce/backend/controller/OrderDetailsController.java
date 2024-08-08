package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.OrderInput;
import com.ecommerce.backend.service.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderDetailsController {

    private final OrderDetailsService orderDetailsService;

    @Autowired
    public OrderDetailsController(OrderDetailsService orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }

    @PreAuthorize("hasRole('User')")
    @PostMapping("/placeOrder/{isCartCheckout}")
    public void placeOrder(
            @PathVariable(name = "isCartCheckout") boolean isCartCheckout,
            @RequestBody OrderInput orderInput) {
        orderDetailsService.placeOrder(orderInput, isCartCheckout);
    }

}
