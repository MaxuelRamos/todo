package com.easypoint.point.service;

import com.easypoint.point.entity.User;
import com.easypoint.point.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepo;
    private final AuthService authService;

    @Autowired
    public UserService(UserRepository userRepo, AuthService authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }

    @Transactional
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_SUPPORT', 'ROLE_COMPANY_MANAGER')")
    public User create(User user) {
        if (user.getId() != null) {
            throw new IllegalArgumentException("This user already have an ID.");
        }
        user.updatePassword();
        return userRepo.save(user);
    }

    @Transactional(readOnly = true)
    public User getById(int id) {
        return userRepo.findById(id).orElse(null);
    }

    @Transactional
    public User updateAccount(User user) {
        User current = authService.authenticated();
        current.applyChanges(user);
        return userRepo.save(current);
    }

    @Transactional
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_SUPPORT')")
    public User update(User user) {
        if (user.getId() == null) {
            throw new IllegalArgumentException("This user doesn't have an ID.");
        }

        User current = userRepo.findById(user.getId()).orElse(null);
        current.applyChanges(user);
        return userRepo.save(current);
    }

    @Transactional
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_SUPPORT')")
    public void delete(Integer id) {
        userRepo.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<User> listUsers() {
        return userRepo.findAll();
    }
}
