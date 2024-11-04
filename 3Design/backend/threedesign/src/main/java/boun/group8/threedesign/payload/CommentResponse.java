package boun.group8.threedesign.payload;


import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.security.Timestamp;

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
