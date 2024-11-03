package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService {


    final UserRepository userRepository;

    public User getUserByEmail(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) throw new ThreeDesignDatabaseException("User not found with email: " + email);

        return user;
    }

    public User getUserById(Long id) {
        User user = userRepository.findUserById(id);

        if (user == null) {
            throw new ThreeDesignDatabaseException("User not found with id: " + id);
        }

        return user;
    }



//    public Boolean updatePassword(User user, String newPassword){
//
//
//
//        user.setPassword(passwordEncoder.encode(newPassword));
//
//        try {
//            userRepository.save(user);
//        } catch (Exception e) {
//            throw new FanaticDatabaseException("Error while saving new password");
//        }
//
//        return true;
//
//    }


}
