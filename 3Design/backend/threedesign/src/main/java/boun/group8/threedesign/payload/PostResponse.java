package boun.group8.threedesign.payload;

import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Set;

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

    Long categoryId;

    Boolean isVisualPost;

    String fileUrl;

    Long challengedPostId;

    Set<String> tags;

    Timestamp createdAt;

    Long reactionId;

    ReactionType reactionType;

    Boolean bookmark;

}
