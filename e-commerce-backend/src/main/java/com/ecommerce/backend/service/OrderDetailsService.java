package com.ecommerce.backend.service;

import com.ecommerce.backend.configuration.JwtRequestFilter;
import com.ecommerce.backend.dao.OrderDetailsDao;
import com.ecommerce.backend.dao.ProductDao;
import com.ecommerce.backend.dao.UserDao;
import com.ecommerce.backend.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderDetailsService {


    private static final String ORDER_PLACED = "Placed";

    private final OrderDetailsDao orderDetailsDao;
    private final ProductDao productDao;
    private final UserDao userDao;

    @Autowired
    public OrderDetailsService(OrderDetailsDao orderDetailsDao, ProductDao productDao, UserDao userDao) {
        this.orderDetailsDao = orderDetailsDao;
        this.productDao = productDao;
        this.userDao = userDao;
    }

    public void placeOrder(OrderInput orderInput){
        List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();

        for (OrderProductQuantity productQuantity : productQuantityList) {
            Product product = productDao.findById(productQuantity.getProductId()).orElseThrow(() -> new NoSuchElementException("Product not found with id " + productQuantity.getProductId()));
            String currentUser = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(currentUser).orElseThrow(() -> new NoSuchElementException("User not found with id " + currentUser));

            OrderDetails orderDetails = new OrderDetails(
                    orderInput.getFullName(),
                    orderInput.getFullAddress(),
                    orderInput.getContactNumber(),
                    orderInput.getAlternateContactNumber(),
                    ORDER_PLACED,
                   product.getProductActualPrice() * productQuantity.getQuantity(),
                    product,
                    user
            );

            orderDetailsDao.save(orderDetails);

        }

    }
}
