package boun.group8.threedesign.payload;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnnotationCreateRequest {

    Long postId; // Optional
    Long commentId; // Optional
    Long userId; // Required
    Integer startIndex; // Required
    Integer endIndex; // Required
    String content; // Required
}