package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.Comment;
import boun.group8.threedesign.payload.CommentResponse;
import boun.group8.threedesign.model.enums.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Comment findCommentById(Long id);

    Comment findByPostId(Long postId);

    @Query("SELECT new boun.group8.threedesign.payload.CommentResponse(c.id, c.text, c.user, c.likes, c.dislikes, c.createdAt, " +
            "COALESCE(r.id, -1L), COALESCE(r.reactionType, boun.group8.threedesign.model.enums.ReactionType.NONE)) " +
            "FROM Comment c LEFT JOIN Reaction r ON c.id = r.comment.id AND r.user.id = :userId " +
            "WHERE c.post.id = :postId " +
            "ORDER BY c.createdAt DESC")
    List<CommentResponse> findAllCommentsAndReactionsByPostAndUser(@Param("userId") Long userId, @Param("postId") Long postId);


}
