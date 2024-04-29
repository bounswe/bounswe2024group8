package com.example.fanaticbackend.service;


import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService {


    //Dependency Injection
    final UserRepository userRepository;


    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {

        User user = userRepository.findByUsername(username);

        return user;

    }
}
