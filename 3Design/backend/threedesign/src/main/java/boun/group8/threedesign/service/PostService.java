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
    final ReactionRepository reactionRepository;
    final WikidataService wikidataService;
    final UserService userService;
    final CommentService commentService;

    //TODO search post, getfeed, getpostbycategory, convertpoststopostresponse, getpostsbyuser, getpostsuserreactedto
    //TODO getbookmarkedposts


    public Post createPost(Long userId, PostCreateRequest request) {
        User user = userRepository.findUserById(userId);

        if (user == null) {
            throw new ThreeDesignDatabaseException("User not found with ID: " + userId);
        }

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
