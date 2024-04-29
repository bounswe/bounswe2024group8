package com.example.fanaticbackend.controller;

import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.payload.PostCreateRequest;
import com.example.fanaticbackend.payload.SearchResponse;
import com.example.fanaticbackend.service.PostService;
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

        if (result.getPosts().isEmpty() || result.getTeam() == null) {
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


}
