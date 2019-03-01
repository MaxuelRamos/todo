package com.easypoint.point.repository;

import com.easypoint.point.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findOneByEmail(String email);

    @Override
    List<User> findAll();

}
