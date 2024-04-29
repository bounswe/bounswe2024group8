package com.example.fanaticbackend.service;


import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
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

    public User getUserByEmail(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) throw new FanaticDatabaseException("User not found with email: " + email);

        return user;
    }

    public User getUserById(Long id) {
        User user = userRepository.findUserById(id);

        if (user == null) {
            throw new FanaticDatabaseException("User not found with id: " + id);
        }

        return user;
    }
}
