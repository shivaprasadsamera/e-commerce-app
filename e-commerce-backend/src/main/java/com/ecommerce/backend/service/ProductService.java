package com.ecommerce.backend.service;

import com.ecommerce.backend.configuration.JwtRequestFilter;
import com.ecommerce.backend.dao.CartDao;
import com.ecommerce.backend.dao.ProductDao;
import com.ecommerce.backend.dao.UserDao;
import com.ecommerce.backend.entity.Cart;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.User;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductDao productDao;
    private final UserDao userDao;
    private final CartDao cartDao;

    @Autowired
    public ProductService(ProductDao productDao, UserDao userDao, CartDao cartDao) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.cartDao = cartDao;
    }

    public Product addNewProduct(Product product) {
        return productDao.save(product);
    }

    public List<Product> getAllProducts(int pageNumber, String searchKey) {

        Pageable pageable = PageRequest.of(pageNumber, 12);
        if (searchKey.isEmpty()) {
            return productDao.findAll(pageable);
        } else {
            return productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchKey, searchKey, pageable);
        }

    }


    public Product getProductDetailsById(Integer productId) {
        Optional<Product> product = productDao.findById(productId);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new RuntimeException("Product not found for id: " + productId);
        }
    }

    public void deleteProductDetails(Integer productId) {
        productDao.deleteById(productId);
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId) {
        if (isSingleProductCheckout) {
            List<Product> list = new ArrayList<>();
            Product product = productDao.findById(productId)
                    .orElseThrow(() -> new EntityNotFoundException("Product not found for ID: " + productId));
            list.add(product);
            return list;
        } else {
            String currentUser = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(currentUser)
                    .orElseThrow(() -> new EntityNotFoundException("User not found for ID: " + currentUser));
            List<Cart> carts = cartDao.findByUser(user);

            return carts.stream().map(Cart::getProduct).collect(Collectors.toList());

        }

    }

}
