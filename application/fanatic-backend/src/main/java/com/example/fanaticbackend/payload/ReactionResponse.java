package com.example.fanaticbackend.payload;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReactionResponse {
    Long postId;

    Long commentId;

    Integer likes;

    Integer dislikes;

    Boolean bookmarked;
}
