package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.Cart;
import com.ecommerce.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PreAuthorize("hasRole('User')")
    @GetMapping("/addToCart/{productId}")
    public Cart addToCart(@PathVariable(name = "productId") Integer productId){
        return cartService.addToCart(productId);
    }

    @PreAuthorize("hasRole('User')")
    @GetMapping("/getCartDetails")
    public List<Cart> getCartDetails(){
        return cartService.getCartDetails();
    }

}
