package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    Reaction findByPostIdAndUserId(Long postId, Long userId);

    Reaction findByCommentIdAndUserId(Long commentId, Long userId);

    Boolean existsByPostIdAndUserId(Long postId, Long userId);

}