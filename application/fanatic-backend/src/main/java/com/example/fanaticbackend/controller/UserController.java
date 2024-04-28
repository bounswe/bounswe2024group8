package com.example.fanaticbackend.controller;



import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserController {

    final UserService userService;

//    @PostMapping("/signup")
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        User savedUser = userService.saveUser(user);
//        return ResponseEntity.ok(savedUser);
//    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }
}
