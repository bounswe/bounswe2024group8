package com.example.fanaticbackend.service;

import com.example.fanaticbackend.model.Comment;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.Reaction;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.ReactionType;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.CommentCreateRequest;
import com.example.fanaticbackend.payload.CommentReactionResponse;
import com.example.fanaticbackend.payload.ReactionRequest;
import com.example.fanaticbackend.repository.CommentRepository;
import com.example.fanaticbackend.repository.ReactionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentService {

    final CommentRepository commentRepository;
    final ReactionRepository reactionRepository;
    final PostService postService;

    public CommentReactionResponse reactToComment(User user, ReactionType reactionType, Long commentId) {
        Long userId = user.getId();
        Comment comment = getCommentElseThrow(commentId);
        Post commentPost = comment.getPost();

        Team userTeam = user.getCommunity().getTeam();
        Team commentTeam = commentPost.getPostedAt();


        if (!userTeam.equals(commentTeam)) {
            throw new RuntimeException("User is not allowed to react to this comment");
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

    public Comment createComment(User user, CommentCreateRequest request) {

        Post post = postService.getPostByIdElseThrow(request.getPostId());

        //TODO Allow global post reaction
        if (!post.getPostedAt().equals(user.getCommunity().getTeam())) {
            throw new RuntimeException("User is not allowed to comment on this post");
        }

        Comment comment = Comment.builder()
                .text(request.getText())
                .user(user)
                .build();

        try {
            commentRepository.save(comment);
            post.setComments(post.getComments() + 1);
        }
        catch (Exception e) {
            throw new RuntimeException("Comment could not be saved");
    }
        return comment;
    }

    public Comment getCommentElseThrow(Long commentId) {
        Comment comment = commentRepository.findCommentById(commentId);
        if (comment == null) {
            throw new RuntimeException("Comment not found");
        }
        return comment;

    }




}
