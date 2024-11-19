package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.Reaction;
import boun.group8.threedesign.model.User;

import boun.group8.threedesign.model.enums.ReactionType;

import boun.group8.threedesign.payload.PostResponse;

import boun.group8.threedesign.payload.ReactionRequest;
import boun.group8.threedesign.payload.ReactionResponse;
import boun.group8.threedesign.repository.ReactionRepository;
import boun.group8.threedesign.repository.UserRepository;
import boun.group8.threedesign.repository.CategoryRepository;

import boun.group8.threedesign.payload.PostCreateRequest;
import boun.group8.threedesign.repository.PostRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.io.IOException;
import java.util.stream.Collectors;

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
    final TournamentService tournamentService;



    final CategoryRepository categoryRepository;

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

        if (request.getJoinToTournament())
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

    public List<PostResponse> searchPosts(User user, String keyword) {

        List<Post> results = new ArrayList<>(postRepository.findByTextLikeIgnoreCase(keyword));

        List<String> siblings = wikidataService.getAllSiblings(keyword);

        for (String sibling : siblings) {
            results.addAll(postRepository.findByTextLikeIgnoreCase(sibling));
        }
        // Use a map to count occurrences of each post
        Set<Post> postSet = new HashSet<>();

        postSet.addAll(results);

        List<Post> sortedPosts = postSet.stream()
                .sorted(Comparator.comparing(Post::getId).reversed())
                .collect(Collectors.toList());

        return convertPostsToPostResponses(user, sortedPosts);

    }

    public List<PostResponse> convertPostsToPostResponses(User user, List<Post> posts) {
        List<PostResponse> result = new ArrayList<>();

        for (Post post : posts) {
            Reaction reaction = reactionRepository.findByPostIdAndUserId(post.getId(), user.getId());
            ReactionType reactionType = ReactionType.NONE;
            Boolean bookmark = false;

            if (reaction != null) {
                reactionType = reaction.getReactionType();
                bookmark = reaction.getBookmark();
            }

            PostResponse postResponse = PostResponse.builder()
                    .postId(post.getId())
                    .text(post.getText())
                    .user(post.getUser())
                    .title(post.getTitle())
                    .likes(post.getLikes())
                    .dislikes(post.getDislikes())
                    .comments(post.getComments())
                    .categoryId(post.getCategoryId())
                    .isVisualPost(post.getIsVisualPost())
                    .fileUrl(post.getFileUrl())
                    .challengedPostId(post.getChallengedPostId())
                    .tags(post.getTags())
                    .createdAt(post.getCreatedAt())
                    .reactionId(reaction == null ? -1L : reaction.getId())
                    .reactionType(reactionType)
                    .bookmark(bookmark)
                    .build();

            result.add(postResponse);
        }
        return result;
    }

    @Transactional
    public ReactionResponse reactToPost(User user, ReactionRequest request, Long postId) {

        Long userId = user.getId();
        Post post = getPostByIdElseThrow(postId);



        ReactionType reactionType = request.getReactionType();
        Boolean bookmark = request.getBookmark();

        Reaction reaction = reactionRepository.findByPostIdAndUserId(postId, userId);

        if (reaction != null) {

            ReactionType oldReactionType = reaction.getReactionType();
            boolean oldBookmark = reaction.getBookmark();

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
            reaction.setBookmark(bookmark);


            if (!post.getUser().getId().equals(user.getId())) {
                int oldReactionScore = tournamentService.calculateReactionScore(oldReactionType, oldBookmark);
                int newReactionScore = tournamentService.calculateReactionScore(reactionType, bookmark);

                tournamentService.updatePostScoreIfPossible(post, newReactionScore - oldReactionScore);
            }


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

            if (!post.getUser().equals(user)) {
                tournamentService.updatePostScoreIfPossible(post, tournamentService.calculateReactionScore(reactionType, bookmark));
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

    public List<PostResponse> getFeed(User user) {

        List<Post> posts = postRepository.findAllPostsByUserDefault(user.getId());

        if (posts.isEmpty()) {
            return new ArrayList<>();
        }

        return convertPostsToPostResponses(user, posts);
    }

    public List<PostResponse> getVisualPostsByCategory(User user, Long categoryId) {

        List<Post> visualPosts = postRepository.findVisualPostsByCategory(categoryId);

        if (visualPosts.isEmpty()) {
            return new ArrayList<>();
        }

        return convertPostsToPostResponses(user, visualPosts);
    }

    public List<PostResponse> getNonVisualPostsByCategory(User user, Long categoryId) {

        List<Post> nonVisualPosts = postRepository.findNonVisualPostsByCategory(categoryId);

        if (nonVisualPosts.isEmpty()) {
            return new ArrayList<>();
        }

        return convertPostsToPostResponses(user, nonVisualPosts);

    }

    public List<PostResponse> getPostsByUser(User user, Long userId) {


        List<Post> posts = postRepository.findAllPostsByAUser(userId);

        if (posts.isEmpty()) {
            return new ArrayList<>();
        }

        return convertPostsToPostResponses(user, posts);

    }

    public List<PostResponse> getPostsUserReactedTo(User user, Long userId) {

        User targetUser = userService.getUserById(userId);

        List<Post> posts = postRepository.findAllByUserReactedTo(targetUser);

        if (posts.isEmpty()) {
            return new ArrayList<>();
        }

        return convertPostsToPostResponses(user, posts);
    }

    public List<PostResponse> getBookmarkedPosts(User user, Long userId) {

        if (!user.getId().equals(userId)) {
            throw new ThreeDesignDatabaseException("You can only view your own bookmarked posts");
        }

        //List<PostResponse> bookmarkedPosts = postRepository.findAllBookmarkedPosts(userId);
        List<Post> bookmarkedPosts = postRepository.findAllBookmarkedPosts(userId);

        if (bookmarkedPosts.isEmpty()) {
            return new ArrayList<>();
        }

        return convertPostsToPostResponses(user, bookmarkedPosts);
    }
}
