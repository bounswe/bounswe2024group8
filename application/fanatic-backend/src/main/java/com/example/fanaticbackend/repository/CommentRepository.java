package com.example.fanaticbackend.repository;

import com.example.fanaticbackend.model.Comment;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.payload.CommentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Comment findCommentById(Long id);

    Comment findByPostId(Long postId);

    @Query("SELECT new com.example.fanaticbackend.payload.CommentResponse(c.id, c.text, c.user, c.likes, c.dislikes, c.createdAt, " +
            "COALESCE(r.id, -1L), COALESCE(r.reactionType, com.example.fanaticbackend.model.enums.ReactionType.NONE)) " +
            "FROM Comment c LEFT JOIN Reaction r ON c.id = r.comment.id AND r.user.id = :userId " +
            "WHERE c.post.id = :postId " +
            "ORDER BY c.createdAt DESC")
    List<CommentResponse> findAllCommentsAndReactionsByPostAndUser(@Param("userId") Long userId, @Param("postId") Long postId);


}
