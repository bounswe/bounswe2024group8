package com.example.fanaticbackend.controller;

import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.payload.PostCreateRequest;
import com.example.fanaticbackend.payload.SearchResponse;
import com.example.fanaticbackend.service.PostService;
import com.example.fanaticbackend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostController {

    final PostService postService;
    final UserService userService;

    @PostMapping("")
    public ResponseEntity<Post> create(
            @RequestBody PostCreateRequest request) {

        Post savedPost = postService.create(request);

        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("")
    public ResponseEntity<SearchResponse> search(
            @RequestParam String param) {

        var result = postService.searchPost(param);

        if (result.getPosts().isEmpty() && result.getTeam() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/feed")
    public ResponseEntity<List<Post>> getFeed() {

        List<Post> posts = postService.getFeed();

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> likePost(@PathVariable Long postId, @RequestParam Long userId) {
        Post post = postService.getPostById(postId);
        User user = userService.getUserById(userId);
        postService.likePost(user, post);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/dislike")
    public ResponseEntity<Void> dislikePost(@PathVariable Long postId, @RequestParam Long userId) {
        Post post = postService.getPostById(postId);
        User user = userService.getUserById(userId);
        postService.dislikePost(user, post);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/bookmark")
    public ResponseEntity<Void> bookmarkPost(@PathVariable Long postId, @RequestParam Long userId) {
        Post post = postService.getPostById(postId);
        User user = userService.getUserById(userId);
        postService.bookmarkPost(user, post);
        return ResponseEntity.ok().build();
    }


}
