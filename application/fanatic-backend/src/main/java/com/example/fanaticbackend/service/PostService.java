package com.example.fanaticbackend.service;

import com.example.fanaticbackend.dto.WikidataTeamDto;
import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.Community;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.Reaction;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.ReactionType;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.*;
import com.example.fanaticbackend.repository.PostRepository;
import com.example.fanaticbackend.repository.ReactionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
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

    final CommunityService communityService;


    public SearchResponse searchPost(String param) {
        List<Post> results = new ArrayList<>();
//        var post = Post.builder().text(wikidataService.search(param))
//                .title("Wikidata Results")
//                .build();
//        results.add(post);
        //TODO: @oguz WikidataService should return type: WikidataTeamDto

        WikidataTeamDto team = wikidataService.search(param);

        if (team != null) {
            List<Post> posts = postRepository.findByTextLikeIgnoreCaseParams(param, team.getLocation());
            results.addAll(posts);

        }
        else {
            List<Post> posts = postRepository.findByTextLikeIgnoreCase(param);
            results.addAll(posts);

        }


        SearchResponse result = new SearchResponse();
        result.setPosts(results);
        result.setTeam(team);

        return result;

    }

    public Post create(User user, PostCreateRequest request) {

        Team userTeam = user.getCommunity().getTeam();
        Team postTeam = request.getPostedAt();

        if (postTeam != Team.GLOBAL && !userTeam.equals(postTeam)) {
            throw new FanaticDatabaseException("User can only post to their own community or global feed");
        }
        
        Post post = Post.builder()
                .title(request.getTitle())
                .text(request.getText())
//                .teamName(Team.valueOf(request.getTeamName()))
                .postedAt(request.getPostedAt())
                .user(user)
                .likes(0)
                .dislikes(0)
                .comments(0)
                .build();

        if (request.getImage() != null) {
            try {
                post.setImage(request.getImage().getBytes());
            } catch (IOException e) {
                throw new FanaticDatabaseException("Image could not be saved");
            }
        }

        try {
            postRepository.save(post);
        } catch (Exception e) {
            throw new FanaticDatabaseException("Post could not be saved");
        }

        return post;
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getFeed(User user) {

        return postRepository.findAllPostsAndUserReactionsByUserDefault(user);
    }


    public Post getPostByIdElseThrow(Long postId) {
        Post post = postRepository.findPostById(postId);

        if (post == null)
            throw new FanaticDatabaseException("Post not found with id: " + postId);

        return post;
    }


    @Transactional
    public ReactionResponse reactToPost(User user, ReactionRequest request, Long postId) {

        Long userId = user.getId();
        Post post = getPostByIdElseThrow(postId);

        Team userTeam = user.getCommunity().getTeam();
        Team postTeam = post.getPostedAt();

        if (!userTeam.equals(postTeam) && !postTeam.equals(Team.GLOBAL)) {
            throw new FanaticDatabaseException("Users can only react to posts from their own community or global posts");
        }


        ReactionType reactionType = request.getReactionType();
        Boolean bookmark = request.getBookmark();

        Reaction reaction = reactionRepository.findByPostIdAndUserId(userId, postId);

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
    public List<Post> getPostsByCommunity(String communityTeam) {

        Community community = communityService.findCommunityByTeamElseThrow(communityTeam);

        return postRepository.findByPostedAtOrderByIdDesc(community.getTeam());

    }
}
