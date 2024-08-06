package com.ecommerce.backend.service;

import com.ecommerce.backend.dao.ProductDao;
import com.ecommerce.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductDao productDao;

    @Autowired
    public ProductService(ProductDao productDao) {
        this.productDao = productDao;
    }

    public Product addNewProduct(Product product){
       return productDao.save(product);
    }

    public List<Product> getAllProducts(int pageNumber, String searchKey){

        Pageable pageable = PageRequest.of(pageNumber,12);
        if (searchKey.isEmpty()){
            return productDao.findAll(pageable);
        }else{
            return productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchKey,searchKey,pageable);
        }

    }

    public Product getProductDetailsById(Integer productId){
        Optional<Product> product = productDao.findById(productId);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new RuntimeException("Product not found for id: " + productId);
        }
    }

    public void deleteProductDetails(Integer productId){
        productDao.deleteById(productId);
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId){
        if(isSingleProductCheckout){
            List<Product> list = new ArrayList<>();
            Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found for ID: " + productId));
            list.add(product);
            return list;
        }
        return  new ArrayList<>();
    }

}
