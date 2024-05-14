package com.example.fanaticbackend.repository;

import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.Reaction;
import com.example.fanaticbackend.model.enums.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Post, Long> {

    Reaction findByPostIdAndUserId(Long postId, Long userId);

    Boolean existsByPostIdAndUserId(Long postId, Long userId);

    void updateReactionByPostIdAndUserId(Long postId, Long userId, ReactionType reactionType);
}
