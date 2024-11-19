package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Annotation;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.AnnotationCreateRequest;
import boun.group8.threedesign.payload.AnnotationResponse;
import boun.group8.threedesign.service.AnnotationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/annotations")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnnotationController {

    final AnnotationService annotationService;

    @PostMapping("/add")
    public ResponseEntity<AnnotationResponse> addAnnotation(
            @AuthenticationPrincipal User user,
            @RequestBody AnnotationCreateRequest annotationRequest) {

        Annotation annotation = annotationService.addAnnotation(
                annotationRequest.getPostId(),
                annotationRequest.getCommentId(),
                user.getId(),
                annotationRequest.getStartIndex(),
                annotationRequest.getEndIndex(),
                annotationRequest.getContent());


        return ResponseEntity.ok().build(); // Modify to return response object if necessary
    }

    @GetMapping("/get")
    public ResponseEntity<List<AnnotationResponse>> getAnnotations(
            @RequestParam(required = false) Long postId,
            @RequestParam(required = false) Long commentId) {

        return ResponseEntity.ok(annotationService.getAnnotations(postId, commentId));
    }
}
