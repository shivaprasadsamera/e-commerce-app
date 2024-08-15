package com.ecommerce.backend.dao;

import com.ecommerce.backend.entity.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactDao extends JpaRepository<ContactForm, Integer> {
}
