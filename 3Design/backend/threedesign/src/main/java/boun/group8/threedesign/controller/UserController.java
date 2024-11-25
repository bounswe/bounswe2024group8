package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Following;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {

        User user = userService.getUserById(id);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/follow")
    public ResponseEntity<Following> followUser(
            @AuthenticationPrincipal User user,
            @RequestParam Long followedUserId) {

        Following follow = userService.followUser(user.getId(), followedUserId);
        return ResponseEntity.ok(follow);
    }

    @DeleteMapping("/unfollow")
    public ResponseEntity<Void> unfollowUser(
            @AuthenticationPrincipal User user,
            @RequestParam Long followedUserId) {
        userService.unfollowUser(user.getId(), followedUserId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<Long>> getFollowers(@PathVariable Long userId) {
        List<Long> followers = userService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Long>> getFollowing(@PathVariable Long userId) {
        List<Long> following = userService.getFollowing(userId);
        return ResponseEntity.ok(following);
    }

    @PostMapping("/profile-picture/upload")
    public ResponseEntity<String> uploadProfilePicture(
            @AuthenticationPrincipal User user,
            @RequestParam("file") MultipartFile file) {

        userService.uploadProfilePicture(user.getId(), file);
        return ResponseEntity.ok().build();
    }



}