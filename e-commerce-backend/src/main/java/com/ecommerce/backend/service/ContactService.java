package com.ecommerce.backend.service;

import com.ecommerce.backend.dao.ContactDao;
import com.ecommerce.backend.entity.ContactForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {
    private final ContactDao contactDao;

    @Autowired
    public ContactService(ContactDao contactDao) {
        this.contactDao = contactDao;
    }

    public ContactForm saveContactForm(ContactForm contactForm) {
        return contactDao.save(contactForm);
    }

    public List<ContactForm> getAllContactForms(){
        return contactDao.findAll();
    }
}
