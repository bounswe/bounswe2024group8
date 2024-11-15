package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;

import boun.group8.threedesign.repository.CategoryRepository;

import boun.group8.threedesign.payload.PostCreateRequest;
import boun.group8.threedesign.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostService {
    final FileService fileService;
    final PostRepository postRepository;
    final CategoryRepository categoryRepository;

    @Transactional
    public Post createPost(User user, PostCreateRequest request) throws IOException {

        validatePostRequest(request);

        if (user == null) {
            throw new ThreeDesignDatabaseException("User not found");
        }

        String fileUrl = null;
        if (request.getIsVisualPost()) {
            fileUrl = handleFileUpload(request.getFile());
        }

        // Build the Post object
        Post post = Post.builder()
                .title(request.getTitle())
                .text(request.getText())
                .user(user)
                .categoryId(request.getCategoryId())
                .isVisualPost(request.getIsVisualPost())
                .fileUrl(fileUrl)
                .likes(0)
                .dislikes(0)
                .comments(0)
                .tags(new HashSet<>(request.getTags()))  // Convert tags to Set<String>
                .challengedPostId(request.getChallengedPostId())
                .build();

        // Save the post to the repository
        return postRepository.save(post);
    }

    private void validatePostRequest(PostCreateRequest request) {
        if (request.getTitle() == null || request.getTitle().isBlank()) {
            throw new ThreeDesignDatabaseException("Title not found");
        }
        if (request.getText() == null || request.getText().isBlank()) {
            throw new ThreeDesignDatabaseException("Text not found");
        }
        if (request.getIsVisualPost() == null) {
            throw new ThreeDesignDatabaseException("Select post type");
        }
        if (!categoryRepository.existsById(request.getCategoryId())) {
            throw new ThreeDesignDatabaseException("Category does not exist");
        }
        if (request.getChallengedPostId() != null && !postRepository.existsById(request.getChallengedPostId())) {
            throw new ThreeDesignDatabaseException("Challenged Post does not exist");
        }
    }
    private String handleFileUpload(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new ThreeDesignDatabaseException("File is required for visual posts");
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null || !isValidFileType(fileName)) {
            throw new ThreeDesignDatabaseException("Invalid file type");
        }

        return fileService.uploadFile(file);
    }
    private boolean isValidFileType(String fileName) {
        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        return fileExtension.equals("obj") ||
                fileExtension.equals("dae") ||
                fileExtension.equals("png") ||
                fileExtension.equals("jpeg");
    }


    public Post getPostByIdElseThrow(Long id) {
        var post = postRepository.getPostById(id);

        if (post == null) {
            throw new ThreeDesignDatabaseException("Post not found with ID: " + id);
        }

        return post;

    }
}
