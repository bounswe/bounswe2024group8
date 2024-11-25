package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.Reaction;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;
import boun.group8.threedesign.payload.PostCreateRequest;
import boun.group8.threedesign.payload.PostResponse;
import boun.group8.threedesign.payload.ReactionRequest;
import boun.group8.threedesign.payload.ReactionResponse;
import boun.group8.threedesign.repository.CategoryRepository;
import boun.group8.threedesign.repository.PostRepository;
import boun.group8.threedesign.repository.ReactionRepository;
import boun.group8.threedesign.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @InjectMocks
    private PostService postService;

    @Mock
    private FileService fileService;

    @Mock
    private UserService userService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReactionRepository reactionRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private TournamentService tournamentService;

    @Mock WikidataService wikidataService;

    @Test
    public void createPost_ThrowsException_WhenCategoryDoesNotExist() {
        // Arrange
        User user = new User();
        PostCreateRequest request = new PostCreateRequest();
        request.setCategoryId(1L);

        when(categoryRepository.existsById(request.getCategoryId())).thenReturn(false);

        // Act & Assert
        assertThatThrownBy(() -> postService.createPost(user, request))
                .isInstanceOf(ThreeDesignDatabaseException.class)
                .hasMessageContaining("Category does not exist");
    }

    @Test
    public void createPost_SavesPost_WhenValidRequest() throws IOException {
        // Arrange
        User user = new User();
        PostCreateRequest request = new PostCreateRequest();
        request.setCategoryId(1L);
        request.setIsVisualPost(false);
        request.setTags(new HashSet<>());
        request.setJoinToTournament(false);
        MultipartFile file = mock(MultipartFile.class);
        request.setFile(file);

        when(categoryRepository.existsById(request.getCategoryId())).thenReturn(true);
        //when(fileService.uploadFile(file)).thenReturn("fileUrl");
        when(postRepository.save(any(Post.class))).thenReturn(new Post());

        // Act
        Post result = postService.createPost(user, request);

        // Assert
        assertNotNull(result);
        verify(postRepository, times(1)).save(any(Post.class));
    }

    @Test
    public void getPostByIdElseThrow_ThrowsException_WhenPostNotFound() {
        // Arrange
        Long postId = 1L;
        when(postRepository.getPostById(postId)).thenReturn(null);

        // Act & Assert
        assertThatThrownBy(() -> postService.getPostByIdElseThrow(postId))
                .isInstanceOf(ThreeDesignDatabaseException.class)
                .hasMessageContaining("Post not found with ID: " + postId);
    }

    @Test
    public void reactToPost_UpdatesReactions_WhenValid() {
        // Arrange
        Long postId = 1L;
        User user1 = new User();
        user1.setId(1L);
        User user2 = new User();
        user2.setId(2L);
        Post post = new Post();
        post.setId(postId);
        post.setLikes(0);
        post.setDislikes(0);
        post.setUser(user1);
        ReactionRequest request = new ReactionRequest();
        request.setReactionType(ReactionType.LIKE);
        request.setBookmark(false);

        when(postRepository.getPostById(postId)).thenReturn(post);
        when(reactionRepository.findByPostIdAndUserId(postId, user1.getId())).thenReturn(null);

        // Act
        ReactionResponse result = postService.reactToPost(user1, request, postId);

        // Assert
        assertEquals(1, result.getLikes());
        assertEquals(0, result.getDislikes());
        assertFalse(result.getBookmarked());
    }

    @Test
    public void getPostsUserReactedTo_ReturnsPostsUserReactedTo() {
        // Arrange
        User user = new User();
        user.setId(1L);
        User targetUser = new User();
        targetUser.setId(2L);
        Post post = new Post();
        post.setId(1L);
        List<Post> posts = new ArrayList<>();
        posts.add(post);

        when(userService.getUserById(targetUser.getId())).thenReturn(targetUser);
        when(postRepository.findAllByUserReactedTo(targetUser)).thenReturn(posts);

        // Act
        List<PostResponse> result = postService.getPostsUserReactedTo(user, targetUser.getId());

        // Assert
        assertEquals(1, result.size());
    }

    @Test
    public void searchPosts_ReturnsPostResponses_WhenKeywordMatches() {
        // Arrange
        User user = new User();
        user.setId(1L);
        String keyword = "test";
        List<Post> posts = new ArrayList<>();
        Post post = new Post();
        post.setId(1L);
        posts.add(post);

        when(postRepository.findByTextLikeIgnoreCase(keyword)).thenReturn(posts);
        when(wikidataService.getAllSiblings(keyword)).thenReturn(new ArrayList<>());

        // Act
        List<PostResponse> result = postService.searchPosts(user, keyword);

        // Assert
        assertEquals(1, result.size());
        assertEquals(post.getId(), result.get(0).getPostId());
    }

    @Test
    public void getFeed_ReturnsPostResponses_WhenUserHasPosts() {
        // Arrange
        User user = new User();
        user.setId(1L);
        List<Post> posts = new ArrayList<>();
        Post post = new Post();
        post.setId(1L);
        posts.add(post);

        when(postRepository.findAllPostsByUserDefault(user.getId())).thenReturn(posts);

        // Act
        List<PostResponse> result = postService.getFeed(user);

        // Assert
        assertEquals(1, result.size());
        assertEquals(post.getId(), result.get(0).getPostId());
    }

    @Test
    public void reactToPost_UpdatesReaction_WhenReactionExists() {
        // Arrange
        Long postId = 1L;
        User user1 = new User();
        user1.setId(1L);
        Post post = new Post();
        post.setId(postId);
        post.setLikes(1);
        post.setDislikes(0);
        post.setUser(user1);

        User user2 = new User();
        Reaction existingReaction = new Reaction();
        existingReaction.setId(1L);
        existingReaction.setReactionType(ReactionType.LIKE);
        existingReaction.setBookmark(false);
        existingReaction.setUser(user2);
        existingReaction.setPost(post);

        ReactionRequest request = new ReactionRequest();
        request.setReactionType(ReactionType.DISLIKE);
        request.setBookmark(true);

        when(postRepository.getPostById(postId)).thenReturn(post);
        when(reactionRepository.findByPostIdAndUserId(postId, user2.getId())).thenReturn(existingReaction);

        // Act
        ReactionResponse result = postService.reactToPost(user2, request, postId);

        // Assert
        assertEquals(0, result.getLikes());
        assertEquals(1, result.getDislikes());
        assertTrue(result.getBookmarked());
        verify(reactionRepository, times(1)).save(existingReaction);
        verify(postRepository, times(1)).save(post);
    }

    @Test
    public void getBookmarkedPosts_ReturnsBookmarkedPosts_WhenUserHasBookmarkedPosts() {
        // Arrange
        User user = new User();
        user.setId(1L);
        List<Post> bookmarkedPosts = new ArrayList<>();
        Post post = new Post();
        post.setId(1L);
        bookmarkedPosts.add(post);

        when(postRepository.findAllBookmarkedPosts(user.getId())).thenReturn(bookmarkedPosts);

        // Act
        List<PostResponse> result = postService.getBookmarkedPosts(user, user.getId());

        // Assert
        assertEquals(1, result.size());
        assertEquals(post.getId(), result.get(0).getPostId());
    }

    @Test
    public void getBookmarkedPosts_ThrowsException_WhenUserTriesToViewOthersBookmarkedPosts() {
        // Arrange
        User user = new User();
        user.setId(1L);
        Long otherUserId = 2L;

        // Act & Assert
        assertThrows(ThreeDesignDatabaseException.class, () -> postService.getBookmarkedPosts(user, otherUserId));
    }

    @Test
    public void getPostsByUser_ReturnsPosts_WhenUserHasPosts() {
        // Arrange
        User user = new User();
        user.setId(1L);
        Long targetUserId = 2L;
        List<Post> posts = new ArrayList<>();
        Post post = new Post();
        post.setId(1L);
        posts.add(post);

        when(postRepository.findAllPostsByAUser(targetUserId)).thenReturn(posts);

        // Act
        List<PostResponse> result = postService.getPostsByUser(user, targetUserId);

        // Assert
        assertEquals(1, result.size());
        assertEquals(post.getId(), result.get(0).getPostId());
    }

}