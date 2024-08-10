package com.ecommerce.backend.dao;

import com.ecommerce.backend.entity.OrderDetails;
import com.ecommerce.backend.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderDetailsDao extends CrudRepository<OrderDetails, Integer> {
    List<OrderDetails> findByUser(User user);
}
