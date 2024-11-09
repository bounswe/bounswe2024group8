package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;

import boun.group8.threedesign.repository.UserRepository;

import boun.group8.threedesign.payload.PostCreateRequest;
import boun.group8.threedesign.repository.PostRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostService {

    final PostRepository postRepository;
    final UserRepository userRepository;

    public Post createPost(Long userId, PostCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ThreeDesignDatabaseException("User not found with ID: " + userId));
        Post post = Post.builder()
                .title(request.getTitle())
                .text(request.getText())
                .user(user)
                .categoryId(request.getCategoryId())
                .isVisualPost(request.getIsVisualPost())
                .fileUrl(request.getFileUrl())
                .likes(0)
                .dislikes(0)
                .comments(0)
                .tags(request.getTags())
                .challengedPostId(request.getChallengedPostId())
                .build();

        // Save the post to the repository
        try {
            return postRepository.save(post);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Post could not be saved", e);
        }
    }


    public Post getPostByIdElseThrow(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ThreeDesignDatabaseException("Post not found with ID: " + id));
    }
}
