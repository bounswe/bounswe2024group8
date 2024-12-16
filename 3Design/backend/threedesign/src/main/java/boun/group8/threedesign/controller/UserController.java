package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Following;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.PostResponse;
import boun.group8.threedesign.payload.UserResponse;
import boun.group8.threedesign.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
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

    @Operation(summary = "Get user by email", description = "Fetches user details using their email address.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("")
    public ResponseEntity<User> getUserByEmail(
            @RequestParam String email) {
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Get user by ID", description = "Fetches user details using their unique ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Get detailed user response by ID", description = "Fetches a detailed user response object by user ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User response retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/get/{id}")
    public ResponseEntity<UserResponse> getUserResponseById(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        UserResponse userResponse = userService.getUserResponseById(user, id);
        return ResponseEntity.ok(userResponse);
    }

    @Operation(summary = "Follow a user", description = "Allows the authenticated user to follow another user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Followed successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid user ID")
    })
    @PostMapping("/follow")
    public ResponseEntity<Following> followUser(
            @AuthenticationPrincipal User user,
            @RequestParam Long followedUserId) {
        Following follow = userService.followUser(user.getId(), followedUserId);
        return ResponseEntity.ok(follow);
    }

    @Operation(summary = "Unfollow a user", description = "Allows the authenticated user to unfollow another user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Unfollowed successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid user ID")
    })
    @DeleteMapping("/unfollow")
    public ResponseEntity<Void> unfollowUser(
            @AuthenticationPrincipal User user,
            @RequestParam Long followedUserId) {
        userService.unfollowUser(user.getId(), followedUserId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get followers", description = "Retrieves the list of user IDs of people following a specific user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Followers retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<Long>> getFollowers(@PathVariable Long userId) {
        List<Long> followers = userService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    }

    @Operation(summary = "Get following", description = "Retrieves the list of user IDs of people a specific user is following.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Following list retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Long>> getFollowing(@PathVariable Long userId) {
        List<Long> following = userService.getFollowing(userId);
        return ResponseEntity.ok(following);
    }

    @Operation(summary = "Upload profile picture", description = "Allows the authenticated user to upload a profile picture.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Profile picture uploaded successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid file format or size")
    })
    @PostMapping(value = "/profile-picture/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfilePicture(
            @AuthenticationPrincipal User user,
            @RequestPart("file") MultipartFile file) {
        userService.uploadProfilePicture(user.getId(), file);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Change password", description = "Allows a user to update their password.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password updated successfully"),
            @ApiResponse(responseCode = "400", description = "Password does not meet security requirements")
    })
    @PutMapping("/{userId}/change-password")
    public ResponseEntity<Boolean> updatePassword(
            @AuthenticationPrincipal User user,
            @PathVariable Long userId,
            @Valid @NotEmpty @RequestParam String password) {
        Boolean result = userService.updatePassword(user, userId, password);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Search users", description = "Searches for users based on a keyword.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search results retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No users found")
    })
    @GetMapping("/search")
    public ResponseEntity<List<UserResponse>> search(
            @AuthenticationPrincipal User user,
            @RequestParam String keyword) {
        var result = userService.searchUsers(user, keyword);

        if (result.isEmpty() ) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

}
