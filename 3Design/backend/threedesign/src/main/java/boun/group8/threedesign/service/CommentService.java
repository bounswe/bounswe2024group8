package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Comment;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.Reaction;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;
import boun.group8.threedesign.payload.CommentCreateRequest;
import boun.group8.threedesign.payload.CommentReactionResponse;
import boun.group8.threedesign.payload.CommentResponse;
import boun.group8.threedesign.repository.CommentRepository;
import boun.group8.threedesign.repository.PostRepository;
import boun.group8.threedesign.repository.ReactionRepository;
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
    final TournamentService tournamentService;


    public CommentReactionResponse reactToComment(User user, ReactionType reactionType, Long commentId) {
        Long userId = user.getId();
        Comment comment = getCommentElseThrow(commentId);
        Post commentPost = comment.getPost();



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



    public Comment createComment(User user, CommentCreateRequest request) {

        Post post = postRepository.getPostById(request.getPostId());

        Comment oldComment = commentRepository.findByPostIdAndUserId(post.getId(), user.getId());
        if (oldComment == null && !post.getUser().getId().equals(user.getId())) {
            tournamentService.updatePostScoreIfPossible(post, 3);
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
            throw new ThreeDesignDatabaseException("Comment could not be saved");
        }
        return comment;
    }

    public Comment getCommentElseThrow(Long commentId) {
        Comment comment = commentRepository.findCommentById(commentId);
        if (comment == null) {
            throw new ThreeDesignDatabaseException("Comment not found with id: " + commentId);
        }
        return comment;

    }

    public List<CommentResponse> getCommentsByPostId(User user, Long postId) {

        Post post = postRepository.getPostById(postId);

        if (post == null)
            throw new ThreeDesignDatabaseException("Post not found");

        return commentRepository.findAllCommentsAndReactionsByPostAndUser(user.getId(), postId);
    }
}
