package com.example.fanaticbackend.payload;

import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.ReactionType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentResponse {

    Long commentId;

    String text;

    User user;

    Integer likes;

    Integer dislikes;

    Timestamp createdAt;

    Long reactionId;

    ReactionType reactionType;
}
