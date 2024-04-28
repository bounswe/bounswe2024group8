package com.example.fanaticbackend.repository;

import com.example.fanaticbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findUserByUsername(String username);

    User findUserById(Long id);

}
