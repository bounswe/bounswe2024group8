package boun.group8.threedesign.payload;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostCreateRequest {
    private Long userId;
    private String title;
    private String text;
    private Long categoryId;
    private Boolean isVisualPost;
    private String fileUrl;
    private Long challengedPostId;
    private Set<String> tags;

}
