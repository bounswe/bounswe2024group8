package com.example.fanaticbackend.payload;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostCreateRequest {
    Long userId;
    String title;
    String text;
    String teamName;
}
