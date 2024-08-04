package com.ecommerce.backend.dao;

import com.ecommerce.backend.entity.OrderDetails;
import org.springframework.data.repository.CrudRepository;

public interface OrderDetailsDao extends CrudRepository<OrderDetails, Integer> {
}
