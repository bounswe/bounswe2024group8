package com.example.fanaticbackend.service;

import com.example.fanaticbackend.dto.WikidataTeamDto;
import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.Community;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.Reaction;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.ReactionType;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.PostCreateRequest;
import com.example.fanaticbackend.payload.ReactionRequest;
import com.example.fanaticbackend.payload.ReactionResponse;
import com.example.fanaticbackend.payload.SearchResponse;
import com.example.fanaticbackend.repository.PostRepository;
import com.example.fanaticbackend.repository.ReactionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @InjectMocks
    private PostService postService;

    @Mock
    private WikidataService wikidataService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserService userService;

    @Mock
    private ReactionRepository reactionRepository;

    @Mock
    private CommunityService communityService;

    @Test
    public void searchPost_ReturnsResultsBasedOnLocation_WhenLocationIsPresent() {
        // Arrange
        User user = new User();
        String param = "Soccer";
        WikidataTeamDto teamDto = WikidataTeamDto.builder()
                .teamName("Team1")
                .location("Location1")
                .build();
        List<Post> posts = new ArrayList<>();
        posts.add(new Post());

        when(wikidataService.search(param)).thenReturn(teamDto);
        when(postRepository.findByTextLikeIgnoreCaseParams(param, teamDto.getLocation())).thenReturn(posts);

        // Act
        SearchResponse result = postService.searchPost(user, param);

        // Assert
        assertEquals(1, result.getPosts().size()); // Assuming convertPostsToPostResponses returns the same number of posts
        assertEquals(teamDto, result.getTeam());
    }

    @Test
    public void create_ThrowsException_WhenUserNotAllowedToPost() {
        // Arrange
        Team userTeam = Team.GALATASARAY;
        Team postTeam = Team.BESIKTAS;
        Community community = Community.builder()
                .team(userTeam)
                .build();

        User user = User.builder()
                .community(community)
                .build();
        PostCreateRequest request = new PostCreateRequest();
        request.setPostedAt(postTeam);

        // Act & Assert
        assertThatThrownBy(() -> postService.create(user, request))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("User can only post to their own community or global feed");
    }

    @Test
    public void getPostByIdElseThrow_ThrowsException_WhenPostNotFound() {
        // Arrange
        Long postId = 1L;
        when(postRepository.findPostById(postId)).thenReturn(null);

        // Act & Assert
        assertThatThrownBy(() -> postService.getPostByIdElseThrow(postId))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("Post not found with id: " + postId);
    }

    @Test
    public void reactToPost_UpdatesReactions_WhenValid() throws Exception {
        // Arrange
        Long postId = 1L;
        Team team = Team.GALATASARAY;
        Community community = Community.builder()
                .team(team)
                .build();

        User user = User.builder()
                .community(community)
                .build();

        Post post = Post.builder()
                .id(postId)
                .likes(0)
                .dislikes(0)
                .postedAt(team)
                .build();

        ReactionRequest request = new ReactionRequest(ReactionType.LIKE, false);

        when(postRepository.findPostById(postId)).thenReturn(post);
        when(reactionRepository.findByPostIdAndUserId(postId, user.getId() )).thenReturn(null);

        // Act
        ReactionResponse result = postService.reactToPost(user, request, postId);

        // Assert
        assertEquals(1, result.getLikes());
        assertEquals(0, result.getDislikes());
        assertFalse(result.getBookmarked());
    }


    @Test
    public void reactToPost_UpdatesReactions_WhenValid_Scenario2() throws Exception {
        // Arrange
        Long postId = 1L;
        Team team = Team.GALATASARAY;
        Community community = Community.builder()
                .team(team)
                .build();

        Post post = Post.builder()
                .id(postId)
                .likes(1)
                .dislikes(0)
                .postedAt(team)
                .build();

        User user = User.builder()
                .community(community)
                .build();

        Reaction reaction = Reaction.builder()
                .id(1L)
                .post(post)
                .user(user)
                .reactionType(ReactionType.LIKE)
                .bookmark(true)
                .build();


        ReactionRequest request = new ReactionRequest(ReactionType.LIKE, false);

        when(postRepository.findPostById(postId)).thenReturn(post);
        when(reactionRepository.findByPostIdAndUserId(postId, user.getId())).thenReturn(reaction);

        // Act
        ReactionResponse result = postService.reactToPost(user, request, postId);

        // Assert
        assertEquals(1, result.getLikes());
        assertEquals(0, result.getDislikes());
        assertFalse(result.getBookmarked());
    }

    @Test
    public void reactToPost_UpdatesReactions_WhenValid_Scenario3() throws Exception {
        // Arrange
        Long postId = 1L;
        Team team = Team.GALATASARAY;
        Community community = Community.builder()
                .team(team)
                .build();

        Post post = Post.builder()
                .id(postId)
                .likes(0)
                .dislikes(1)
                .postedAt(team)
                .build();

        User user = User.builder()
                .community(community)
                .build();

        Reaction reaction = Reaction.builder()
                .id(1L)
                .post(post)
                .user(user)
                .reactionType(ReactionType.DISLIKE)
                .bookmark(true)
                .build();


        ReactionRequest request = new ReactionRequest(ReactionType.LIKE, false);

        when(postRepository.findPostById(postId)).thenReturn(post);
        when(reactionRepository.findByPostIdAndUserId(postId, user.getId())).thenReturn(reaction);

        // Act
        ReactionResponse result = postService.reactToPost(user, request, postId);

        // Assert
        assertEquals(1, result.getLikes());
        assertEquals(0, result.getDislikes());
        assertFalse(result.getBookmarked());
    }

    @Test
    public void reactToPost_UpdatesReactions_WhenValid_Scenario4() throws Exception {
        // Arrange
        Long postId = 1L;
        Team team = Team.GALATASARAY;
        Community community = Community.builder()
                .team(team)
                .build();

        Post post = Post.builder()
                .id(postId)
                .likes(1)
                .dislikes(0)
                .postedAt(team)
                .build();

        User user = User.builder()
                .community(community)
                .build();

        Reaction reaction = Reaction.builder()
                .id(1L)
                .post(post)
                .user(user)
                .reactionType(ReactionType.LIKE)
                .bookmark(false)
                .build();


        ReactionRequest request = new ReactionRequest(ReactionType.NONE, true);

        when(postRepository.findPostById(postId)).thenReturn(post);
        when(reactionRepository.findByPostIdAndUserId(postId, user.getId())).thenReturn(reaction);

        // Act
        ReactionResponse result = postService.reactToPost(user, request, postId);

        // Assert
        assertEquals(0, result.getLikes());
        assertEquals(0, result.getDislikes());
        assertTrue(result.getBookmarked());
    }

}
