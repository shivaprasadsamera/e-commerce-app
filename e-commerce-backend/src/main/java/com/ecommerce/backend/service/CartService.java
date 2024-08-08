package com.ecommerce.backend.service;

import com.ecommerce.backend.configuration.JwtRequestFilter;
import com.ecommerce.backend.dao.CartDao;
import com.ecommerce.backend.dao.ProductDao;
import com.ecommerce.backend.dao.UserDao;
import com.ecommerce.backend.entity.Cart;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CartService {

    private final CartDao cartDao;
    private final ProductDao productDao;
    private final UserDao userDao;
    private final JwtRequestFilter jwtRequestFilter;

    @Autowired
    public CartService(CartDao cartDao, ProductDao productDao, UserDao userDao, JwtRequestFilter jwtRequestFilter) {
        this.cartDao = cartDao;
        this.productDao = productDao;
        this.userDao = userDao;
        this.jwtRequestFilter = jwtRequestFilter;
    }


    public Cart addToCart(Integer productId) {
        Product product = productDao.findById(productId).orElseThrow(() -> new NoSuchElementException("Product not found with id " + productId));
        String currentUser = JwtRequestFilter.CURRENT_USER;

        User user =null;

        if (currentUser != null){
            user = userDao.findById(currentUser)
                    .orElseThrow(() -> new NoSuchElementException("User not found with id " + currentUser));
        }

        List<Cart> cartList = cartDao.findByUser(user);
        List<Cart> filteredCartList = cartList.stream()
                .filter(cart -> cart.getProduct().getProductId().equals(productId))
                .toList();

        if(!filteredCartList.isEmpty()){
            return null;
        }

        if (product != null && user != null){
            Cart cart = new Cart(product,user);
            return cartDao.save(cart);
        }
        return null;

    }

   public List<Cart> getCartDetails(){
        String userName = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(userName)
                .orElseThrow(() -> new NoSuchElementException("User not found with id " + userName));
        return cartDao.findByUser(user);
    }

    public void deleteCartItem(Integer cartId){
        cartDao.deleteById(cartId);
    }

}
