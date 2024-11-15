package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.Reaction;
import boun.group8.threedesign.model.enums.ReactionType;


import boun.group8.threedesign.payload.ReactionRequest;
import boun.group8.threedesign.payload.ReactionResponse;
import boun.group8.threedesign.repository.ReactionRepository;
import boun.group8.threedesign.repository.UserRepository;
import boun.group8.threedesign.repository.CategoryRepository;

import boun.group8.threedesign.payload.PostCreateRequest;
import boun.group8.threedesign.repository.PostRepository;
import boun.group8.threedesign.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
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
    final UserRepository userRepository;
    final ReactionRepository reactionRepository;
    final WikidataService wikidataService;
    final UserService userService;
    final CommentService commentService;

    //TODO search post, getfeed, getpostbycategory, convertpoststopostresponse, getpostsbyuser, getpostsuserreactedto
    //TODO getbookmarkedposts

    final CategoryRepository categoryRepository;
    final UserRepository userRepository;
    final TournamentService tournamentService;

    @Transactional
    public Post createPost(User user, PostCreateRequest request) throws IOException {

        validatePostRequest(request);

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

        Post created;
        try {
            created = postRepository.save(post);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Error while saving post");
        }

        tournamentService.enterTournament(user, created);
        return created;
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

    public ReactionResponse reactToPost(User user, ReactionRequest request, Long postId) {

        Long userId = user.getId();
        Post post = getPostByIdElseThrow(postId);



        ReactionType reactionType = request.getReactionType();
        Boolean bookmark = request.getBookmark();

        Reaction reaction = reactionRepository.findByPostIdAndUserId(postId, userId);

        if (reaction != null) {

            ReactionType oldReactionType = reaction.getReactionType();
            reaction.setBookmark(bookmark);

            if (oldReactionType.equals(ReactionType.LIKE)) {
                if (reactionType.equals(ReactionType.DISLIKE)) {
                    post.setLikes(post.getLikes() - 1);
                    post.setDislikes(post.getDislikes() + 1);
                } else if (reactionType.equals(ReactionType.NONE)) {
                    post.setLikes(post.getLikes() - 1);
                }
            } else if (oldReactionType.equals(ReactionType.DISLIKE)) {
                if (reactionType.equals(ReactionType.LIKE)) {
                    post.setDislikes(post.getDislikes() - 1);
                    post.setLikes(post.getLikes() + 1);
                } else if (reactionType.equals(ReactionType.NONE)) {
                    post.setDislikes(post.getDislikes() - 1);
                }
            } else if (oldReactionType.equals(ReactionType.NONE)) {
                if (reactionType.equals(ReactionType.LIKE)) {
                    post.setLikes(post.getLikes() + 1);
                } else if (reactionType.equals(ReactionType.DISLIKE)) {
                    post.setDislikes(post.getDislikes() + 1);
                }
            }

            reaction.setReactionType(reactionType);
            reactionRepository.save(reaction);
            postRepository.save(post);
        } else {
            reaction = Reaction.builder()
                    .reactionType(reactionType)
                    .bookmark(bookmark)
                    .user(user)
                    .post(post)
                    .build();

            reactionRepository.save(reaction);

            if (reactionType.equals(ReactionType.LIKE)) {
                post.setLikes(post.getLikes() + 1);
            } else if (reactionType.equals(ReactionType.DISLIKE)) {
                post.setDislikes(post.getDislikes() + 1);
            }
            postRepository.save(post);
        }


        ReactionResponse result = new ReactionResponse();
        result.setPostId(postId);
        result.setLikes(post.getLikes());
        result.setDislikes(post.getDislikes());
        result.setBookmarked(reaction.getBookmark());
        return result;
    }

}
