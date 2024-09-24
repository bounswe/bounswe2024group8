package com.example.fanaticbackend.payload;

import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.ReactionType;
import com.example.fanaticbackend.model.enums.Team;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {

    Long postId;

    String text;

    User user;

    String title;

    Integer likes;

    Integer dislikes;

    Integer comments;

    Team postedAt;

    byte[] image;

    Timestamp createdAt;

    Long reactionId;

    ReactionType reactionType;

    Boolean bookmark;

    public PostResponse(Long postId, String text, User user, String title, int likes, int dislikes, int comments, Team postedAt, byte[] image, Timestamp createdAt, Long reactionId, ReactionType reactionType, boolean bookmark) {
        this.postId = postId;
        this.text = text;
        this.user = user;
        this.title = title;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
        this.postedAt = postedAt;
        this.image = image;
        this.createdAt = createdAt;
        this.reactionId = reactionId;
        this.reactionType = reactionType;
        this.bookmark = bookmark;
    }
}
