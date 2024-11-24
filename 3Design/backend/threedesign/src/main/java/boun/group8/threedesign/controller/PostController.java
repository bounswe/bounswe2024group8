package boun.group8.threedesign.controller;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Comment;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;
import boun.group8.threedesign.payload.*;
import boun.group8.threedesign.service.CommentService;
import boun.group8.threedesign.service.PostService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostController {
    final PostService postService;
    final CommentService commentService;


    @PostMapping
    public ResponseEntity<Post> createPost(
            @AuthenticationPrincipal User user,
            @Valid @ModelAttribute PostCreateRequest request) throws Exception {

        Post createdPost = postService.createPost(user, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {

        Post post = postService.getPostByIdElseThrow(id);

        return ResponseEntity.ok(post);
    }

    @GetMapping("/new/{id}")
    public ResponseEntity<PostResponse> getPostResponseById(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {

        PostResponse post = postService.getPostResponseByIdElseThrow(user, id);

        return ResponseEntity.ok(post);
    }

    @GetMapping("")
    public ResponseEntity<List<PostResponse>> search(
            @AuthenticationPrincipal User user,
            @RequestParam String param) {

        var result = postService.searchPosts(user, param);

        if (result.isEmpty() ) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/{postId}/react")
    public ResponseEntity<ReactionResponse> reactPost(
            @AuthenticationPrincipal User userDetails,
            @Valid @RequestBody ReactionRequest request,
            @PathVariable Long postId) {

        ReactionResponse result = postService.reactToPost(userDetails, request, postId);


        return ResponseEntity.ok(result);

    }

    @PostMapping("/comment")
    public ResponseEntity<Comment> createComment(
            @AuthenticationPrincipal User userDetails,
            @RequestBody CommentCreateRequest request) {

        Comment savedComment = commentService.createComment(userDetails, request);

        return ResponseEntity.ok(savedComment);
    }

    @PostMapping("/comment/{commentId}/react")
    public ResponseEntity<CommentReactionResponse> reactComment(
            @AuthenticationPrincipal User userDetails,
            @RequestParam ReactionType reactionType,
            @PathVariable Long commentId) {

        CommentReactionResponse result = commentService.reactToComment(userDetails, reactionType, commentId);

        return ResponseEntity.ok(result);

    }

    @GetMapping("/feed")
    public ResponseEntity<List<PostResponse>> getFeed(
            @AuthenticationPrincipal User user) {

        List<PostResponse> posts = postService.getFeed((user));

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/category/{categoryId}/visual")
    public ResponseEntity<List<PostResponse>> getVisualPostsByCategory(
            @AuthenticationPrincipal User user,
            @PathVariable Long categoryId) {

        List<PostResponse> posts = postService.getVisualPostsByCategory(user, categoryId);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/category/{categoryId}/nonvisual")
    public ResponseEntity<List<PostResponse>> getNonVisualPostsByCategory(
            @AuthenticationPrincipal User user,
            @PathVariable Long categoryId) {

        List<PostResponse> posts = postService.getNonVisualPostsByCategory(user, categoryId);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostResponse>> getPostsOfUser(
            @AuthenticationPrincipal User user,
            @PathVariable Long userId) {

        List<PostResponse> posts = postService.getPostsByUser(user, userId);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{userId}/reacted")
    public ResponseEntity<List<PostResponse>> getPostsUserReactedTo(
            @AuthenticationPrincipal User user,
            @PathVariable Long userId) {

        List<PostResponse> posts = postService.getPostsUserReactedTo(user, userId);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{userId}/bookmarked")
    public ResponseEntity<List<PostResponse>> getBookmarkedPosts(
            @AuthenticationPrincipal User user,
            @PathVariable Long userId) {

        List<PostResponse> posts = postService.getBookmarkedPosts(user, userId);

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

}
