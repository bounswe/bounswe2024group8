package boun.group8.threedesign.controller;


import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.CommentResponse;
import boun.group8.threedesign.service.CommentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentController {

    final CommentService commentService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponse>> getComments(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long postId) {
        List<CommentResponse> comments = commentService.getCommentsByPostId((User) userDetails, postId);

        if (comments.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(comments);
    }
}
