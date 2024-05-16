package com.example.fanaticbackend.controller;



import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.payload.PostResponse;
import com.example.fanaticbackend.payload.UpdateProfilePictureRequest;
import com.example.fanaticbackend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/{id}/profile-picture")
    public ResponseEntity<Boolean> updateProfilePicture(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @ModelAttribute UpdateProfilePictureRequest request) {

        Boolean result = userService.updateProfilePicture(user, id, request.getProfilePicture());

        return ResponseEntity.ok(result);
    }

    @PutMapping("/{userId}/change-password")
    public ResponseEntity<Boolean> updatePassword(
            @AuthenticationPrincipal User user,
            @PathVariable Long userId,
            @Valid @NotEmpty @RequestParam String password) {

        Boolean result = userService.updatePassword(user, userId, password);

        return ResponseEntity.ok(result);
    }




}
