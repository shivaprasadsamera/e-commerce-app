package com.ecommerce.backend.service;

import com.ecommerce.backend.configuration.JwtRequestFilter;
import com.ecommerce.backend.dao.CartDao;
import com.ecommerce.backend.dao.OrderDetailsDao;
import com.ecommerce.backend.dao.ProductDao;
import com.ecommerce.backend.dao.UserDao;
import com.ecommerce.backend.entity.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import io.github.cdimascio.dotenv.Dotenv;

import jakarta.persistence.EntityNotFoundException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class OrderDetailsService {


    private static final String ORDER_PLACED = "Placed";
    private static final String CURRENCY = "INR";

    private final ProductDao productDao;
    private final UserDao userDao;
    private final CartDao cartDao;
    private final OrderDetailsDao orderDetailsDao;
    private final JwtRequestFilter jwtRequestFilter;
    private final String razorpayKeyId;
    private final String razorpayKeySecret;

    @Autowired
    public OrderDetailsService(ProductDao productDao,
                               UserDao userDao,
                               CartDao cartDao,
                               OrderDetailsDao orderDetailsDao,
                               JwtRequestFilter jwtRequestFilter,
                               Dotenv dotenv) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.cartDao = cartDao;
        this.orderDetailsDao = orderDetailsDao;
        this.jwtRequestFilter = jwtRequestFilter;
        this.razorpayKeyId = dotenv.get("RAZORPAY_KEY_ID");
        this.razorpayKeySecret = dotenv.get("RAZORPAY_KEY_SECRET");
    }

    public void placeOrder(OrderInput orderInput, boolean isCartCheckout) {
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
                    user,
                    orderInput.getRazorpay_payment_id(),
                    orderInput.getRazorpay_order_id(),
                    orderInput.getRazorpay_signature()
            );
            //empty the cart
            if (!isCartCheckout) {
                List<Cart> carts = cartDao.findByUser(user);
                cartDao.deleteAll(carts);
            }
            orderDetailsDao.save(orderDetails);

        }

    }

    public List<OrderDetails> getMyOrders() {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + currentUser));
        return orderDetailsDao.findByUser(user);
    }

    public List<OrderDetails> getAllUsersOrders() {
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        orderDetailsDao.findAll().forEach(orderDetailsList::add);

        return orderDetailsList;
    }

    public void markAsDelivered(Integer orderId) {
        OrderDetails orderDetails = orderDetailsDao.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + orderId));

        if (orderDetails != null) {
            orderDetails.setOrderStatus("Delivered");
            orderDetailsDao.save(orderDetails);
        }
    }

    public TransactionDetails createTransaction(Double amount) {
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero.");
        }
        try {
            // Create payload
            JSONObject payload = new JSONObject();
            payload.put("amount", amount * 100); // Amount in paise (₹1 = 100 paise)
            payload.put("currency", CURRENCY);
            // Initialize Razorpay client
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            // Create the order
            Order order = razorpayClient.orders.create(payload);
            // Prepare transaction details
            TransactionDetails transactionDetails = prepareTransactionDetails(order);
            // Print or return the created order and transaction details
            System.out.println("Razorpay Order created: " + order);
            return transactionDetails;
        } catch (RazorpayException e) {
            // Handle RazorpayException
            System.err.println("Error occurred while creating Razorpay order: " + e.getMessage());
            return null;
        }
    }

    private TransactionDetails prepareTransactionDetails(Order order) {
        String orderId = order.get("id");
        String currency = order.get("currency");
        Integer amount = order.get("amount");
        // Assuming created_at is of type Date
        Date createdAtDate = order.get("created_at");
        Long createdAtTimestamp = createdAtDate != null ? createdAtDate.getTime() : null;

        // Initialize formattedDate as null
        String timeStamp = null;

        // Format the date if createdAtTimestamp is not null
        if (createdAtTimestamp != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("IST")); // Set time zone as needed
            timeStamp = sdf.format(new Date(createdAtTimestamp));
        }

        // Create and return the TransactionDetails object
        return new TransactionDetails(orderId, currency, amount, createdAtTimestamp, timeStamp, razorpayKeyId);
    }
}
