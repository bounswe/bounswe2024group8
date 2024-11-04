package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Comment;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.CommentCreateRequest;
import boun.group8.threedesign.payload.CommentResponse;
import boun.group8.threedesign.repository.CommentRepository;
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

    public Comment createComment(User user, CommentCreateRequest request) {

        Post post = postRepository.findPostById(request.getPostId());

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

    public List<CommentResponse> getCommentsByPostId(User user, Long postId) {

        Post post = postRepository.findPostById(postId);

        if (post == null)
            throw new ThreeDesignDatabaseException("Post not found");

        return commentRepository.findAllCommentsAndReactionsByPostAndUser(user.getId(), postId);
    }
}
