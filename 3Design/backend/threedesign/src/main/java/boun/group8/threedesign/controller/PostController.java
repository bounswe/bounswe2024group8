package boun.group8.threedesign.controller;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.PostCreateRequest;
import boun.group8.threedesign.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostController {
    final PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(
            @AuthenticationPrincipal UserDetails userDetails,
            @ModelAttribute PostCreateRequest request) throws IOException {

        User user = (User) userDetails;

        Post createdPost = postService.createPost(user, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {

        Post post = postService.getPostByIdElseThrow(id);

        return ResponseEntity.ok(post);
    }
}
