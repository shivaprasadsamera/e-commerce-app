package com.ecommerce.backend.dao;

import com.ecommerce.backend.entity.OrderDetails;
import com.ecommerce.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderDetailsDao extends JpaRepository<OrderDetails, Integer> {
    public List<OrderDetails> findByUser(User user);
}
