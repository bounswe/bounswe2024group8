package boun.group8.threedesign.service;

import boun.group8.threedesign.model.Annotation;
import boun.group8.threedesign.model.Comment;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.AnnotationResponse;
import boun.group8.threedesign.repository.AnnotationRepository;
import boun.group8.threedesign.repository.CommentRepository;
import boun.group8.threedesign.repository.PostRepository;
import boun.group8.threedesign.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnnotationService {

    final AnnotationRepository annotationRepository;

    final UserRepository userRepository;

    final CommentRepository commentRepository;

    final PostRepository postRepository;

    String BACKEND_URL = "http://localhost:8080/api/v1/"; //TODO: CHANGE THIS

    public Annotation addAnnotation(Long postId, Long commentId, Long userId, Integer startIndex, Integer endIndex, String content) {

        if(postId !=null && commentId != null){
            throw new IllegalArgumentException("Either postId or commentId must be provided, not both.");
        }

        Post post;
        Comment comment;
        if (postId != null){
            post = postRepository.getPostById(postId);
            if (post == null){
                throw new IllegalArgumentException("Post not found");
            }
        }else if (commentId != null){
            comment = commentRepository.findCommentById(commentId);
            if (comment == null){
                throw new IllegalArgumentException("Comment not found");
            }
        }else{
            throw new IllegalArgumentException("Either postId or commentId must be provided.");
        }

        Annotation annotation = Annotation.builder()
                .postId(postId)
                .commentId(commentId)
                .userId(userId)
                .startingIndex(startIndex)
                .endingIndex(endIndex)
                .content(content)
                .build();
        return annotationRepository.save(annotation);
    }

    public List<AnnotationResponse> getAnnotations(Long postId, Long commentId) {
        List<Annotation> annotations;

        if(postId !=null && commentId != null){
            throw new IllegalArgumentException("Either postId or commentId must be provided, not both.");
        }

        String getUrl;
        if (postId != null) {
            annotations = annotationRepository.findAllByPostId(postId);
            getUrl = "posts/" + postId;
//            annotationUrl =  "annotations/get?postId=" + postId;
        } else if (commentId != null) {
            annotations = annotationRepository.findAllByCommentId(commentId);
            getUrl = "comments/"+commentId;
//            annotationUrl = "annotations/get?commentId=" + commentId;
        } else {
            throw new IllegalArgumentException("Either postId or commentId must be provided.");
        }

        return annotations.stream().map(annotation -> {
            User user = userRepository.findById(annotation.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String annotationUrl = "annotations/" + annotation.getId();
            return new AnnotationResponse(
                    "http://www.w3.org/ns/anno.jsonld",
                    BACKEND_URL + annotationUrl,
                    "Annotation",
                    annotation.getContent(),
                    new AnnotationResponse.CreatorDTO(
                            BACKEND_URL + "users/" + annotation.getUserId(),
                            "Person",
                            user.getUsername()
                    ),
                    annotation.getCreated(),
                    new AnnotationResponse.TargetDTO(
                            BACKEND_URL  + getUrl,  // Modify as needed
                            new AnnotationResponse.SelectorDTO(
                                    "TextPositionSelector",
                                    annotation.getStartingIndex(),
                                    annotation.getEndingIndex()
                            )
                    )
            );
        }).collect(Collectors.toList());
    }

    public AnnotationResponse getAnnotationById(Long id) {
        Annotation annotation = annotationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annotation not found"));

        User user = userRepository.findById(annotation.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String annotationUrl;
        String getUrl;
        if (annotation.getPostId() != null) {
            getUrl = "posts/" + annotation.getPostId();
//            annotationUrl =  "annotations/get?postId=" + annotation.getPostId();
        } else {
            getUrl = "comments/"+annotation.getCommentId();
//            annotationUrl = "annotations/get?commentId=" + annotation.getCommentId();
        }

        annotationUrl = "annotations/" + id;
        return new AnnotationResponse(
                "http://www.w3.org/ns/anno.jsonld",
                BACKEND_URL + annotationUrl,
                "Annotation",
                annotation.getContent(),
                new AnnotationResponse.CreatorDTO(
                        BACKEND_URL + "users/" + annotation.getUserId(),
                        "Person",
                        user.getUsername()
                ),
                annotation.getCreated(),
                new AnnotationResponse.TargetDTO(
                        BACKEND_URL + getUrl,
                        new AnnotationResponse.SelectorDTO(
                                "TextPositionSelector",
                                annotation.getStartingIndex(),
                                annotation.getEndingIndex()
                        )
                )
        );
    }

}
