package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.OrderDetails;
import com.ecommerce.backend.entity.OrderInput;
import com.ecommerce.backend.entity.TransactionDetails;
import com.ecommerce.backend.service.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @PreAuthorize("hasRole('User')")
    @GetMapping("/getMyOrders")
    public List<OrderDetails> getMyOrders() {
        return orderDetailsService.getMyOrders();
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/getAllUsersOrders")
    public List<OrderDetails> getAllUsersOrders() {
        return orderDetailsService.getAllUsersOrders();
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/markAsDelivered/{orderId}")
    public void markAsDelivered(@PathVariable(name = "orderId") Integer orderId) {
        orderDetailsService.markAsDelivered(orderId);
    }

    @PreAuthorize("hasRole('User')")
    @GetMapping("/createTransaction/{amount}")
    public TransactionDetails createTransaction(@PathVariable(name = "amount") Double amount) {
        return orderDetailsService.createTransaction(amount);
    }


}
