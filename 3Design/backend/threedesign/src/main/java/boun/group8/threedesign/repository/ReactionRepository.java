package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.Reaction;
import boun.group8.threedesign.model.enums.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    Reaction findByPostIdAndUserId(Long postId, Long userId);

    Reaction findByCommentIdAndUserId(Long commentId, Long userId);

    Boolean existsByPostIdAndUserId(Long postId, Long userId);

    int countByUserId(Long userId);

    int countByUserIdAndReactionType(Long userId, ReactionType reactionType);

    int countByUserIdAndBookmark(Long userId, Boolean bookmark);

}