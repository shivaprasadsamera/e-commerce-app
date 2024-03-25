package com.ecommerce.backend.service;

import com.ecommerce.backend.dao.ProductDao;
import com.ecommerce.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    public Product addNewProduct(Product product){
       return productDao.save(product);
    }

}
