package com.easypoint.point.service;

import com.easypoint.point.entity.User;
import com.easypoint.point.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepo;

    @Autowired
    public AuthService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }


    @Override
    @Transactional(readOnly = true)
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findOneByEmail(email).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", email));
        } else {
            return user;
        }
    }

    @Transactional(readOnly = true)
    public User getById(int id) {
        Optional<User> user = userRepo.findById(id);
        return user.orElse(null);
    }

    @Transactional(readOnly = true)
    public User authenticated() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (User) auth.getPrincipal();
    }
}
