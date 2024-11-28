package boun.group8.threedesign.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import boun.group8.threedesign.model.Comment;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.Reaction;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;
import boun.group8.threedesign.payload.CommentReactionResponse;
import boun.group8.threedesign.repository.CommentRepository;
import boun.group8.threedesign.repository.ReactionRepository;
import boun.group8.threedesign.repository.PostRepository;
import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.util.TestDataBuilder;
import boun.group8.threedesign.payload.CommentCreateRequest;
import boun.group8.threedesign.payload.CommentResponse;

import org.junit.jupiter.api.*;
import org.mockito.*;

import java.sql.Timestamp;
import java.util.*;

public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;
    @Mock
    private ReactionRepository reactionRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private TournamentService tournamentService;
    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testReactToComment_ChangeReaction_LIKE_to_DISLIKE() {
        // Arrange
        Long commentId = 1L;
        Long userId = 1L;
        User user = TestDataBuilder.createUser(userId);
        Comment comment = TestDataBuilder.createComment(commentId, userId, 1, 0);  // Initially 1 like, 0 dislikes
        Reaction reaction = TestDataBuilder.createReaction(1L, ReactionType.LIKE, userId, commentId);
        when(commentRepository.findCommentById(commentId)).thenReturn(comment);
        when(reactionRepository.findByCommentIdAndUserId(commentId, userId)).thenReturn(reaction);

        // Act
        CommentReactionResponse response = commentService.reactToComment(user, ReactionType.DISLIKE, commentId);

        // Assert
        assertNotNull(response);
        assertEquals(commentId, response.getCommentId());
        assertEquals(0, response.getLikes());  // Likes should decrease
        assertEquals(1, response.getDislikes());  // Dislikes should increase
        verify(reactionRepository).save(reaction);  // Reaction saved
        verify(commentRepository).save(comment);  // Comment saved
    }

    @Test
    void testReactToComment_ChangeReaction_LIKE_to_NONE() {
        // Arrange
        Long commentId = 1L;
        Long userId = 1L;
        User user = TestDataBuilder.createUser(userId);
        Comment comment = TestDataBuilder.createComment(commentId, userId, 1, 0);  // Initially 1 like, 0 dislikes
        Reaction reaction = TestDataBuilder.createReaction(1L, ReactionType.LIKE, userId, commentId);
        when(commentRepository.findCommentById(commentId)).thenReturn(comment);
        when(reactionRepository.findByCommentIdAndUserId(commentId, userId)).thenReturn(reaction);

        // Act
        CommentReactionResponse response = commentService.reactToComment(user, ReactionType.NONE, commentId);

        // Assert
        assertNotNull(response);
        assertEquals(commentId, response.getCommentId());
        assertEquals(0, response.getLikes());  // Likes should decrease
        assertEquals(0, response.getDislikes());  // Dislikes should remain the same
        verify(reactionRepository).save(reaction);  // Reaction saved
        verify(commentRepository).save(comment);  // Comment saved
    }

    @Test
    void testReactToComment_ChangeReaction_DISLIKE_to_LIKE() {
        // Arrange
        Long commentId = 1L;
        Long userId = 1L;
        User user = TestDataBuilder.createUser(userId);
        Comment comment = TestDataBuilder.createComment(commentId, userId, 0, 1);  // Initially 0 likes, 1 dislike
        Reaction reaction = TestDataBuilder.createReaction(1L, ReactionType.DISLIKE, userId, commentId);
        when(commentRepository.findCommentById(commentId)).thenReturn(comment);
        when(reactionRepository.findByCommentIdAndUserId(commentId, userId)).thenReturn(reaction);

        // Act
        CommentReactionResponse response = commentService.reactToComment(user, ReactionType.LIKE, commentId);

        // Assert
        assertNotNull(response);
        assertEquals(commentId, response.getCommentId());
        assertEquals(1, response.getLikes());  // Likes should increase
        assertEquals(0, response.getDislikes());  // Dislikes should decrease
        verify(reactionRepository).save(reaction);  // Reaction saved
        verify(commentRepository).save(comment);  // Comment saved
    }

    @Test
    void testReactToComment_ChangeReaction_DISLIKE_to_NONE() {
        // Arrange
        Long commentId = 1L;
        Long userId = 1L;
        User user = TestDataBuilder.createUser(userId);
        Comment comment = TestDataBuilder.createComment(commentId, userId, 0, 1);  // Initially 0 likes, 1 dislike
        Reaction reaction = TestDataBuilder.createReaction(1L, ReactionType.DISLIKE, userId, commentId);
        when(commentRepository.findCommentById(commentId)).thenReturn(comment);
        when(reactionRepository.findByCommentIdAndUserId(commentId, userId)).thenReturn(reaction);

        // Act
        CommentReactionResponse response = commentService.reactToComment(user, ReactionType.NONE, commentId);

        // Assert
        assertNotNull(response);
        assertEquals(commentId, response.getCommentId());
        assertEquals(0, response.getLikes());  // Likes should remain the same
        assertEquals(0, response.getDislikes());  // Dislikes should decrease
        verify(reactionRepository).save(reaction);  // Reaction saved
        verify(commentRepository).save(comment);  // Comment saved
    }

    @Test
    void testReactToComment_ChangeReaction_NONE_to_LIKE() {
        // Arrange
        Long commentId = 1L;
        Long userId = 1L;
        User user = TestDataBuilder.createUser(userId);
        Comment comment = TestDataBuilder.createComment(commentId, userId, 0, 0);  // Initially 0 likes, 0 dislikes
        Reaction reaction = TestDataBuilder.createReaction(1L, ReactionType.NONE, userId, commentId);
        when(commentRepository.findCommentById(commentId)).thenReturn(comment);
        when(reactionRepository.findByCommentIdAndUserId(commentId, userId)).thenReturn(reaction);

        // Act
        CommentReactionResponse response = commentService.reactToComment(user, ReactionType.LIKE, commentId);

        // Assert
        assertNotNull(response);
        assertEquals(commentId, response.getCommentId());
        assertEquals(1, response.getLikes());  // Likes should increase
        assertEquals(0, response.getDislikes());  // Dislikes should remain the same
        verify(reactionRepository).save(reaction);  // Reaction saved
        verify(commentRepository).save(comment);  // Comment saved
    }

    @Test
    void testCreateComment() {
        // Arrange
        User user = new User();
        user.setId(1L);  // Assuming User has an ID
        Post post = new Post();
        post.setId(1L);
        post.setUser(user);  // The user who created the post
        when(postRepository.getPostById(1L)).thenReturn(post);
        when(commentRepository.save(any(Comment.class))).thenReturn(new Comment());

        CommentCreateRequest request = new CommentCreateRequest(1L,"Great post!");

        // Act
        Comment comment = commentService.createComment(user, request);

        // Assert
        assertNotNull(comment);
        assertEquals("Great post!", comment.getText());
        verify(postRepository).save(post);  // Verifying that post was saved
        verify(commentRepository).save(any(Comment.class));  // Verifying that comment was saved
    }

    @Test
    void testCreateComment_ExceptionHandling() {
        // Arrange
        User user = new User();
        user.setId(1L);

        Post post = new Post();
        post.setId(1L);
        post.setUser(user);
        post.setComments(0);

        when(postRepository.getPostById(1L)).thenReturn(post);
        when(commentRepository.save(any(Comment.class))).thenThrow(new RuntimeException("Database error"));

        CommentCreateRequest request = new CommentCreateRequest(1L, "Nice post!");

        // Act & Assert
        assertThrows(ThreeDesignDatabaseException.class, () -> {
            commentService.createComment(user, request);
        });
    }

    @Test
    void testGetCommentsByPostId_ValidPost() {
        // Arrange
        Long postId = 1L;
        Long userId = 1L;

        User user = TestDataBuilder.createUser(userId);
        Post post = TestDataBuilder.createPost(postId, userId);
        List<CommentResponse> commentResponses = List.of(new CommentResponse(1L, "Great post!", user, 5, 0, new Timestamp(System.currentTimeMillis()), 2L, ReactionType.LIKE));

        when(postRepository.getPostById(postId)).thenReturn(post);
        when(commentRepository.findAllCommentsAndReactionsByPostAndUser(userId, postId)).thenReturn(commentResponses);

        // Act
        List<CommentResponse> responses = commentService.getCommentsByPostId(user, postId);

        // Assert
        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("Great post!", responses.get(0).getText());
        assertEquals(5, responses.get(0).getLikes());
        assertEquals(0, responses.get(0).getDislikes());
        assertEquals(ReactionType.LIKE, responses.get(0).getReactionType());
    }

    @Test
    void testGetCommentElseThrow_CommentFound() {
        // Arrange
        Comment comment = new Comment();
        comment.setId(1L);
        comment.setText("Nice post!");
        when(commentRepository.findCommentById(1L)).thenReturn(comment);

        // Act
        Comment fetchedComment = commentService.getCommentElseThrow(1L);

        // Assert
        assertNotNull(fetchedComment);
        assertEquals(1L, fetchedComment.getId());
    }

    @Test
    void testGetCommentElseThrow_CommentNotFound() {
        // Arrange
        Long commentId = 1L;
        when(commentRepository.findCommentById(commentId)).thenReturn(null);

        // Act & Assert
        assertThrows(ThreeDesignDatabaseException.class, () -> {
            commentService.getCommentElseThrow(commentId);
        });

    }



    @Test
    void testGetCommentsByPostId_PostNotFound() {
        Long postId = 1L;
        Long userId = 1L;

        // Create mock data using TestDataBuilder
        User user = TestDataBuilder.createUser(userId);

        // Mock the post repository to return null
        when(postRepository.getPostById(postId)).thenReturn(null);

        // Call the method to test and assert the exception
        assertThrows(ThreeDesignDatabaseException.class, () -> {
            commentService.getCommentsByPostId(user, postId);
        });
    }
}
