package com.example.fanaticbackend.controller;



import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserController {

    final UserService userService;


    @GetMapping("")
    public ResponseEntity<User> getUserByEmail(
            @RequestParam String email) {

        User user = userService.getUserByEmail(email);

        return ResponseEntity.ok(user);
    }
}
