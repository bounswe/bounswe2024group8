package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.User;
import boun.group8.threedesign.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {

        User user = userService.getUserById(id);

        return ResponseEntity.ok(user);
    }


//    @PutMapping("/change-password")
//    public ResponseEntity<Boolean> updatePassword(
//            @AuthenticationPrincipal User user,
//            @PathVariable Long userId,
//            @RequestParam String password) {
//
//        Boolean result = userService.updatePassword(user, userId, password);
//
//        return ResponseEntity.ok(result);
//    }




}