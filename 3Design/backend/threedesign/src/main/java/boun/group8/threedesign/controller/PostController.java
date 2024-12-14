package boun.group8.threedesign.controller;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Comment;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;
import boun.group8.threedesign.payload.*;
import boun.group8.threedesign.service.CommentService;
import boun.group8.threedesign.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostController {
    final PostService postService;
    final CommentService commentService;

    @Operation(summary = "Create a post", description = "Creates a new post with optional file upload.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Post created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> createPost(
            @AuthenticationPrincipal User user,
            @Valid @ModelAttribute PostCreateRequest request,
            @RequestPart(required = false) MultipartFile file) throws Exception {

        request.setFile(file);
        Post createdPost = postService.createPost(user, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @Operation(summary = "Get post by ID", description = "Retrieves a post by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Post not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {

        Post post = postService.getPostByIdElseThrow(id);

        return ResponseEntity.ok(post);
    }

    @Operation(summary = "Get detailed post response", description = "Retrieves a detailed post response by ID, including user-specific details.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post response retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Post not found")
    })
    @GetMapping("/new/{id}")
    public ResponseEntity<PostResponse> getPostResponseById(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {

        PostResponse post = postService.getPostResponseByIdElseThrow(user, id);

        return ResponseEntity.ok(post);
    }

    @Operation(summary = "Search posts", description = "Searches posts based on a search parameter.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posts retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No posts found")
    })
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

    @Operation(summary = "React to a post", description = "Allows the authenticated user to react to a specific post.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reaction recorded successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @PostMapping("/{postId}/react")
    public ResponseEntity<ReactionResponse> reactPost(
            @AuthenticationPrincipal User userDetails,
            @Valid @RequestBody ReactionRequest request,
            @PathVariable Long postId) {

        ReactionResponse result = postService.reactToPost(userDetails, request, postId);


        return ResponseEntity.ok(result);

    }

    @Operation(summary = "Create a comment", description = "Allows the authenticated user to create a comment for a post.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @PostMapping("/comment")
    public ResponseEntity<Comment> createComment(
            @AuthenticationPrincipal User userDetails,
            @RequestBody CommentCreateRequest request) {

        Comment savedComment = commentService.createComment(userDetails, request);

        return ResponseEntity.ok(savedComment);
    }

    @Operation(summary = "React to a comment", description = "Allows the authenticated user to react to a specific comment.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reaction recorded successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @PostMapping("/comment/{commentId}/react")
    public ResponseEntity<CommentReactionResponse> reactComment(
            @AuthenticationPrincipal User userDetails,
            @RequestParam ReactionType reactionType,
            @PathVariable Long commentId) {

        CommentReactionResponse result = commentService.reactToComment(userDetails, reactionType, commentId);

        return ResponseEntity.ok(result);

    }

    @Operation(summary = "Get user feed", description = "Retrieves the feed of posts for the authenticated user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Feed retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No posts found")
    })
    @GetMapping("/feed")
    public ResponseEntity<List<PostResponse>> getFeed(
            @AuthenticationPrincipal User user) {

        List<PostResponse> posts = postService.getFeed((user));

        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(posts);
    }

    @Operation(summary = "Get visual posts by category", description = "Retrieves visual posts in a specific category for the authenticated user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posts retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No posts found")
    })
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

    @Operation(summary = "Get non-visual posts by category", description = "Retrieves non-visual posts in a specific category for the authenticated user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posts retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No posts found")
    })
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

    @Operation(summary = "Get posts of a user", description = "Retrieves posts created by a specific user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posts retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No posts found")
    })
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

    @Operation(summary = "Get posts reacted to by a user", description = "Retrieves posts a specific user has reacted to.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posts retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No posts found")
    })
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

    @Operation(summary = "Get bookmarked posts of a user", description = "Retrieves bookmarked posts of a specific user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posts retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No posts found")
    })
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
