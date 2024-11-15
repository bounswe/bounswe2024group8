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

import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostController {
    final PostService postService;
    final CommentService commentService;


    //TODO getpostsof category, getpostsofuser, getpostsusersreactedto, getbookmarkedposts, getfeed


    @PostMapping
    public ResponseEntity<Post> createPost(
            @AuthenticationPrincipal User user,
            @ModelAttribute PostCreateRequest request) throws IOException {

        Post createdPost = postService.createPost(user, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {

        Post post = postService.getPostByIdElseThrow(id);

        return ResponseEntity.ok(post);
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

}
