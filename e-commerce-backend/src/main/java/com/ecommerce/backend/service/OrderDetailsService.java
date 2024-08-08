package com.ecommerce.backend.service;

import com.ecommerce.backend.configuration.JwtRequestFilter;
import com.ecommerce.backend.dao.CartDao;
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

    private final ProductDao productDao;
    private final UserDao userDao;
    private final CartDao cartDao;
    private final OrderDetailsDao orderDetailsDao;

    @Autowired
    public OrderDetailsService(ProductDao productDao, UserDao userDao, CartDao cartDao, OrderDetailsDao orderDetailsDao) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.cartDao = cartDao;
        this.orderDetailsDao = orderDetailsDao;
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
}
