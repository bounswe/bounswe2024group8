package com.example.fanaticbackend.service;

import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.Comment;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.Reaction;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.ReactionType;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.CommentCreateRequest;
import com.example.fanaticbackend.payload.CommentReactionResponse;
import com.example.fanaticbackend.payload.CommentResponse;
import com.example.fanaticbackend.payload.ReactionRequest;
import com.example.fanaticbackend.repository.CommentRepository;
import com.example.fanaticbackend.repository.PostRepository;
import com.example.fanaticbackend.repository.ReactionRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentService {

    final CommentRepository commentRepository;
    final ReactionRepository reactionRepository;
    final PostRepository postRepository;

//    @Transactional
    public CommentReactionResponse reactToComment(User user, ReactionType reactionType, Long commentId) {
        Long userId = user.getId();
        Comment comment = getCommentElseThrow(commentId);
        Post commentPost = comment.getPost();

        Team userTeam = user.getCommunity().getTeam();
        Team commentTeam = commentPost.getPostedAt();


        if (!userTeam.equals(commentTeam) && !commentTeam.equals(Team.GLOBAL)) {
            throw new FanaticDatabaseException("User is not allowed to react to this comment");
        }

        Reaction reaction = reactionRepository.findByCommentIdAndUserId(commentId, userId);

        if (reaction != null) {

            ReactionType oldReactionType = reaction.getReactionType();

            if (oldReactionType.equals(ReactionType.LIKE)) {
                if (reactionType.equals(ReactionType.DISLIKE)) {
                    comment.setLikes(comment.getLikes() - 1);
                    comment.setDislikes(comment.getDislikes() + 1);
                } else if (reactionType.equals(ReactionType.NONE)) {
                    comment.setLikes(comment.getLikes() - 1);
                }
            } else if (oldReactionType.equals(ReactionType.DISLIKE)) {
                if (reactionType.equals(ReactionType.LIKE)) {
                    comment.setDislikes(comment.getDislikes() - 1);
                    comment.setLikes(comment.getLikes() + 1);
                } else if (reactionType.equals(ReactionType.NONE)) {
                    comment.setDislikes(comment.getDislikes() - 1);
                }
            } else if (oldReactionType.equals(ReactionType.NONE)) {
                if (reactionType.equals(ReactionType.LIKE)) {
                    comment.setLikes(comment.getLikes() + 1);
                } else if (reactionType.equals(ReactionType.DISLIKE)) {
                    comment.setDislikes(comment.getDislikes() + 1);
                }
            }

            reaction.setReactionType(reactionType);
            reactionRepository.save(reaction);
            commentRepository.save(comment);
        }
        else {
            reaction = Reaction.builder()
                    .reactionType(reactionType)
                    .comment(comment)
                    .user(user)
                    .build();

            reactionRepository.save(reaction);

            if (reactionType.equals(ReactionType.LIKE)) {
                comment.setLikes(comment.getLikes() + 1);
            } else if (reactionType.equals(ReactionType.DISLIKE)) {
                comment.setDislikes(comment.getDislikes() + 1);
            }
            commentRepository.save(comment);
        }

        CommentReactionResponse result = new CommentReactionResponse();
        result.setCommentId(commentId);
        result.setLikes(comment.getLikes());
        result.setDislikes(comment.getDislikes());
        return result;
    }

//    @Transactional
    public Comment createComment(User user, CommentCreateRequest request) {

        Post post = postRepository.findPostById(request.getPostId());

        //TODO Allow global post reaction
        if (!post.getPostedAt().equals(user.getCommunity().getTeam()) && !post.getPostedAt().equals(Team.GLOBAL)) {
            throw new FanaticDatabaseException("User is not allowed to comment on this post");
        }

        Comment comment = Comment.builder()
                .text(request.getText())
                .user(user)
                .post(post)
                .likes(0)
                .dislikes(0)
                .build();

        try {
            commentRepository.save(comment);
            post.setComments(post.getComments() + 1);
            postRepository.save(post);
        }
        catch (Exception e) {
            throw new FanaticDatabaseException("Comment could not be saved");
        }
        return comment;
    }

    public Comment getCommentElseThrow(Long commentId) {
        Comment comment = commentRepository.findCommentById(commentId);
        if (comment == null) {
            throw new FanaticDatabaseException("Comment not found with id: " + commentId);
        }
        return comment;

    }

    public List<CommentResponse> getCommentsByPostId(User user, Long postId) {

        Post post = postRepository.findPostById(postId);

        if (post == null)
            throw new FanaticDatabaseException("Post not found");

        return commentRepository.findAllCommentsAndReactionsByPostAndUser(user.getId(), postId);
    }




}
