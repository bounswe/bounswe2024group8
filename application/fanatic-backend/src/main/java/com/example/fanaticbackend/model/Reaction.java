package com.example.fanaticbackend.model;

import com.example.fanaticbackend.model.enums.ReactionType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "reactions")
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "reaction_type",nullable = false)
    ReactionType reactionType;

    @Column(name = "bookmark",nullable = false)
    Boolean bookmark;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    Comment comment;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    Timestamp createdAt;

}
