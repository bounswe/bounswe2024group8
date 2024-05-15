package com.example.fanaticbackend.service;


import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.payload.PostResponse;
import com.example.fanaticbackend.repository.PostRepository;
import com.example.fanaticbackend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService {


    //Dependency Injection
    final UserRepository userRepository;
    final PostRepository postRepository;
    final PasswordEncoder passwordEncoder;


//    public User saveUser(User user) {
//        return userRepository.save(user);
//    }

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

    public Boolean updateProfilePicture(User user, Long userId, MultipartFile profilePicture){

        if (!user.getId().equals(userId)) {
            throw new FanaticDatabaseException("You can only update your own profile picture");
        }

        try {
            user.setProfilePicture(profilePicture.getBytes());
        } catch (Exception e) {
            throw new FanaticDatabaseException("Error while updating profile picture");
        }

        try {
            userRepository.save(user);
        } catch (Exception e) {
            throw new FanaticDatabaseException("Error while saving new profile picture");
        }

        return true;

    }

    public Boolean updatePassword(User user, Long userId, String newPassword){

        if (!user.getId().equals(userId)) {
            throw new FanaticDatabaseException("You can only update your own password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        try {
            userRepository.save(user);
        } catch (Exception e) {
            throw new FanaticDatabaseException("Error while saving new password");
        }

        return true;

    }


}
