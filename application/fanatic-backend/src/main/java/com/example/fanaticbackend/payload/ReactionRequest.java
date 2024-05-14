package com.example.fanaticbackend.payload;

import com.example.fanaticbackend.model.enums.ReactionType;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReactionRequest {

    Long postId;

    Long commentId;

    @NotNull(message = "Reaction type is required")
    ReactionType reactionType;
}
