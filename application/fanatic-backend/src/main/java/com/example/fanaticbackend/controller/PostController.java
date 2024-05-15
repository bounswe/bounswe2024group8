package com.example.fanaticbackend.controller;

import com.example.fanaticbackend.model.Comment;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.ReactionType;
import com.example.fanaticbackend.payload.*;
import com.example.fanaticbackend.service.CommentService;
import com.example.fanaticbackend.service.PostService;
import com.example.fanaticbackend.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostController {

    final PostService postService;
    final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<Post> create(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @ModelAttribute PostCreateRequest request) {

        User user = (User) userDetails;

        Post savedPost = postService.create(user, request);

        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("")
    public ResponseEntity<SearchResponse> search(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String param) {

        var result = postService.searchPost((User) userDetails, param);

        if (result.getPosts().isEmpty() && result.getTeam() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/feed")
    public ResponseEntity<List<PostResponse>> getFeed(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<PostResponse> posts = postService.getFeed((User) userDetails);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @PostMapping("/{postId}/react")
    public ResponseEntity<ReactionResponse> reactPost(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ReactionRequest request,
            @PathVariable Long postId) {
        // @oguz
        ReactionResponse result = postService.reactToPost((User) userDetails, request, postId);


        return ResponseEntity.ok(result);

    }

    @PostMapping("/comment")
    public ResponseEntity<Comment> createComment(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody CommentCreateRequest request) {

        User user = (User) userDetails;
        Comment savedComment = commentService.createComment((User) userDetails, request);

        return ResponseEntity.ok(savedComment);
    }

    @PostMapping("/comment/{commentId}/react")
    public ResponseEntity<CommentReactionResponse> reactComment(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam ReactionType reactionType,
            @PathVariable Long commentId) {
        // @oguz
        CommentReactionResponse result = commentService.reactToComment((User) userDetails, reactionType, commentId);

        return ResponseEntity.ok(result);

    }

    @GetMapping("/community/{communityTeam}")
    public ResponseEntity<List<PostResponse>> getPostsOfCommunity(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String communityTeam) {

        List<PostResponse> posts = postService.getPostsByCommunity((User) userDetails, communityTeam);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostResponse>> getPostsOfUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long userId) {

        List<PostResponse> posts = postService.getPostsByUser((User) userDetails, userId);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }


    @GetMapping("/user/{userId}/reacted")
    public ResponseEntity<List<PostResponse>> getPostsUserReactedTo(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long userId) {

        List<PostResponse> posts = postService.getPostsUserReactedTo((User) userDetails, userId);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }




}
