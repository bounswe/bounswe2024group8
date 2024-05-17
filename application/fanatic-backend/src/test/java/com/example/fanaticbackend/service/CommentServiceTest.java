package com.example.fanaticbackend.service;

import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.*;
import com.example.fanaticbackend.model.enums.ReactionType;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.*;
import com.example.fanaticbackend.repository.PostRepository;
import com.example.fanaticbackend.repository.ReactionRepository;
import com.example.fanaticbackend.service.CommentService;
import com.example.fanaticbackend.repository.CommentRepository;
import com.example.fanaticbackend.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CommentServiceTest {

    @InjectMocks
    private CommentService commentService;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private PostService postService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private ReactionRepository reactionRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void createComment_ThrowsException_WhenUserNotAllowedToComment() {
        // Arrange
        Team userTeam = Team.GALATASARAY;
        Team postTeam = Team.BESIKTAS;
        Community community = Community.builder()
                .team(userTeam)
                .build();

        User user = User.builder()
                .community(community)
                .build();

        Post post = Post.builder()
                .id(1L)
                .postedAt(postTeam)
                .build();

        CommentCreateRequest request = new CommentCreateRequest();
        request.setPostId(1L);

        // Act
        when(postRepository.findPostById(1L)).thenReturn(post);

        // Assert
        assertThatThrownBy(() -> commentService.createComment(user, request))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("User is not allowed to comment on this post");
    }

    @Test
    public void getCommentElseThrow_ThrowsException_WhenCommentNotFound() {
        // Arrange
        Long commentId = 1L;
        when(commentRepository.findById(commentId)).thenReturn(null);

        // Act & Assert
        assertThatThrownBy(() -> commentService.getCommentElseThrow(commentId))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("Comment not found with id: " + commentId);

    }

    @Test
    public void getCommentsByPostId_ThrowsException_WhenPostNotFound() {
        // Arrange
        Long postId = 1L;
        User user = User.builder().id(1L).build();
        when(postRepository.findPostById(postId)).thenReturn(null);

        // Act & Assert
        assertThatThrownBy(() -> commentService.getCommentsByPostId(user, postId))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Post not found");
    }

    @Test
    public void reactToComment_UpdatesReactions_WhenValid() {
        // Arrange
        Long commentId = 1L;
        Team userTeam = Team.GALATASARAY;
        Team postTeam = Team.BESIKTAS;

        Community community = Community.builder()
                .team(userTeam)
                .build();

        User user = User.builder()
                .id(1L)
                .community(community)
                .build();

        Post post = Post.builder()
                .id(1L)
                .postedAt(userTeam)
                .build();

        Comment comment = Comment.builder()
                .id(commentId)
                .likes(0)
                .dislikes(0)
                .post(post)
                .build();

        ReactionType reactionType = ReactionType.LIKE;

        when(commentRepository.findCommentById(commentId)).thenReturn(comment);
        when(reactionRepository.findByCommentIdAndUserId(commentId, user.getId() )).thenReturn(null);




        // Act
        CommentReactionResponse result = commentService.reactToComment(user, reactionType, commentId);

        // Assert
        assertEquals(1, result.getLikes());
        assertEquals(0, result.getDislikes());
    }

    @Test
    public void reactToComment_UpdatesReactions_WhenValid_Scenario2() {
        // Arrange
        Long commentId = 1L;
        Team userTeam = Team.GALATASARAY;
        Team postTeam = Team.BESIKTAS;

        Community community = Community.builder()
                .team(userTeam)
                .build();

        User user = User.builder()
                .id(1L)
                .community(community)
                .build();

        Post post = Post.builder()
                .id(1L)
                .postedAt(userTeam)
                .build();

        Comment comment = Comment.builder()
                .id(commentId)
                .likes(1)
                .dislikes(0)
                .post(post)
                .build();

        Reaction reaction = Reaction.builder()
                .id(1L)
                .comment(comment)
                .user(user)
                .reactionType(ReactionType.LIKE)
                .build();

        ReactionType reactionType = ReactionType.DISLIKE;

        when(commentRepository.findCommentById(commentId)).thenReturn(comment);
        when(reactionRepository.findByCommentIdAndUserId(commentId, user.getId() )).thenReturn(reaction);




        // Act
        CommentReactionResponse result = commentService.reactToComment(user, reactionType, commentId);

        // Assert
        assertEquals(0, result.getLikes());
        assertEquals(1, result.getDislikes());
    }

    @Test
    public void reactToComment_UpdatesReactions_WhenValid_Scenario3() {
        // Arrange
        Long commentId = 1L;
        Team userTeam = Team.GALATASARAY;
        Team postTeam = Team.BESIKTAS;

        Community community = Community.builder()
                .team(userTeam)
                .build();

        User user = User.builder()
                .id(1L)
                .community(community)
                .build();

        Post post = Post.builder()
                .id(1L)
                .postedAt(userTeam)
                .build();

        Comment comment = Comment.builder()
                .id(commentId)
                .likes(1)
                .dislikes(0)
                .post(post)
                .build();

        Reaction reaction = Reaction.builder()
                .id(1L)
                .comment(comment)
                .user(user)
                .reactionType(ReactionType.LIKE)
                .build();

        ReactionType reactionType = ReactionType.NONE;

        when(commentRepository.findCommentById(commentId)).thenReturn(comment);
        when(reactionRepository.findByCommentIdAndUserId(commentId, user.getId() )).thenReturn(reaction);




        // Act
        CommentReactionResponse result = commentService.reactToComment(user, reactionType, commentId);

        // Assert
        assertEquals(0, result.getLikes());
        assertEquals(0, result.getDislikes());
    }

}