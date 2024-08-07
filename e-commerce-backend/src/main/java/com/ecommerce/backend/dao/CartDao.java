package com.ecommerce.backend.dao;

import com.ecommerce.backend.entity.Cart;
import com.ecommerce.backend.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDao extends CrudRepository<Cart, Integer> {

    public List<Cart> findByUser(User user);


}
