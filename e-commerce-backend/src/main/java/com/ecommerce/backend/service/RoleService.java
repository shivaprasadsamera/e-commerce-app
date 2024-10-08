package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Role;
import com.ecommerce.backend.dao.RoleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private final RoleDao roleDao;

    @Autowired
    public RoleService(RoleDao roleDao) {
        this.roleDao = roleDao;
    }


    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}
