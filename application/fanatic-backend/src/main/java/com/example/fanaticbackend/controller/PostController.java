package com.example.fanaticbackend.controller;

import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostController {

    final PostService postService;

    @GetMapping("/search")
    public ResponseEntity<Post> searchPost(
            @RequestParam String param) {
        Post post = postService.searchPost(param);

        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(post);
    }


}
