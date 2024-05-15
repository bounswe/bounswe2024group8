package com.example.fanaticbackend.service;

import com.example.fanaticbackend.dto.WikidataTeamDto;
import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.Reaction;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.ReactionType;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.PostCreateRequest;
import com.example.fanaticbackend.payload.ReactionRequest;
import com.example.fanaticbackend.payload.SearchResponse;
import com.example.fanaticbackend.repository.PostRepository;
import com.example.fanaticbackend.repository.ReactionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostService {

    final WikidataService wikidataService;
    final PostRepository postRepository;
    final UserService userService;
    final CommentService commentService;
    final ReactionRepository reactionRepository;


    public SearchResponse searchPost(String param) {
        List<Post> results = new ArrayList<>();
//        var post = Post.builder().text(wikidataService.search(param))
//                .title("Wikidata Results")
//                .build();
//        results.add(post);
        //TODO: @oguz WikidataService should return type: WikidataTeamDto

        WikidataTeamDto team = wikidataService.search(param);

        List<Post> posts = postRepository.findByTextLikeIgnoreCase(param);
        results.addAll(posts);

        List<Post> postsWithLocation = postRepository.findByTextLikeIgnoreCase(team.getLocation());
        results.addAll(postsWithLocation);

        SearchResponse result = new SearchResponse();
        result.setPosts(results);
        result.setTeam(team);

        return result;

    }

    public Post create(PostCreateRequest request) {

        User user = userService.getUserById(request.getUserId());

        Post post = Post.builder()
                .title(request.getTitle())
                .text(request.getText())
                .teamName(Team.valueOf(request.getTeamName()))
                .user(user)
                .likes(0)
                .dislikes(0)
                .comments(0)
                .build();

        try {
            postRepository.save(post);
        } catch (Exception e) {
            throw new FanaticDatabaseException("Post could not be saved");
        }

        return post;
    }

    public List<Post> getFeed() {

        return postRepository.findAllByOrderByIdDesc();
    }



    public Post getPostByIdElseThrow(Long postId) {
        Post post = postRepository.findPostById(postId);

        if (post == null)
            throw new FanaticDatabaseException("Post not found with id: " + postId);

        return post;
    }

    public Boolean reactPostOrComment(User user, ReactionRequest request) {

        Long postId = request.getPostId();
        Long commentId = request.getCommentId();
        Long userId = user.getId();

        if (postId != null && commentId != null) {
            throw new FanaticDatabaseException("You can only react to a post or a comment, not both");
        }

        if (postId != null) {
            return reactToPost(userId, postId, request);
        } else if (commentId != null) {
            return commentService.reactToComment(userId, commentId, request) ;
        }

        return false;
    }


    public Boolean reactToPost(Long userId, Long postId, ReactionRequest request) {

        Reaction reaction = reactionRepository.findByPostIdAndUserId(userId, postId);

        if (reaction != null) {
            if (!reaction.getReactionType().equals(reactionType)) {
                reaction.setReactionType(reactionType);
                return true;
            } else {
                reaction.setReactionType(ReactionType.NONE);
                return true;
            }
            //reactionRepository.save(reaction);
        } else {
            reactionRepository.save(user, post);
            return true;
        }

    }
}
