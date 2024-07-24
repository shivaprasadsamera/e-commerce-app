package com.ecommerce.backend.service;

import com.ecommerce.backend.dao.ProductDao;
import com.ecommerce.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    public Product addNewProduct(Product product){
       return productDao.save(product);
    }

    public List<Product> getAllProducts(){
        return (List<Product>)productDao.findAll();
    }

    public Product getProductDetailsById(Integer productId){
//        return productDao.findById(productId).get();
        Optional<Product> product = productDao.findById(productId);
        if (product.isPresent()) {
            return product.get();
        } else {
            // Handle the case when the product is not found
            throw new RuntimeException("Product not found for id: " + productId);
        }
    }

    public void deleteProductDetails(Integer productId){
        productDao.deleteById(productId);
    }

}
