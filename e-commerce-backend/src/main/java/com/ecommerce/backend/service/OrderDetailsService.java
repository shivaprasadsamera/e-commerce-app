package com.ecommerce.backend.service;

import com.ecommerce.backend.configuration.JwtRequestFilter;
import com.ecommerce.backend.dao.CartDao;
import com.ecommerce.backend.dao.OrderDetailsDao;
import com.ecommerce.backend.dao.ProductDao;
import com.ecommerce.backend.dao.UserDao;
import com.ecommerce.backend.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderDetailsService {


    private static final String ORDER_PLACED = "Placed";

    private final ProductDao productDao;
    private final UserDao userDao;
    private final CartDao cartDao;
    private final OrderDetailsDao orderDetailsDao;
    private final JwtRequestFilter jwtRequestFilter;

    @Autowired
    public OrderDetailsService(ProductDao productDao, UserDao userDao, CartDao cartDao, OrderDetailsDao orderDetailsDao, JwtRequestFilter jwtRequestFilter) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.cartDao = cartDao;
        this.orderDetailsDao = orderDetailsDao;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    public void placeOrder(OrderInput orderInput, boolean isCartCheckout){
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
                   product.getProductDiscountedPrice() * productQuantity.getQuantity(),
                    product,
                    user
            );
            //empty the cart
            if (!isCartCheckout) {
                List<Cart> carts = cartDao.findByUser(user);
                cartDao.deleteAll(carts);
            }
            orderDetailsDao.save(orderDetails);

        }

    }

    public List<OrderDetails> getMyOrders(){
        String currentUser = jwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + currentUser));
        return orderDetailsDao.findByUser(user);
    }

    public List<OrderDetails> getAllUsersOrders(){
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        orderDetailsDao.findAll().forEach(orderDetailsList::add);

        return orderDetailsList;
    }

    public void markAsDelivered(Integer orderId){
        OrderDetails orderDetails = orderDetailsDao.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + orderId));

        if (orderDetails != null){
            orderDetails.setOrderStatus("Delivered");
            orderDetailsDao.save(orderDetails);
        }
    }
}
