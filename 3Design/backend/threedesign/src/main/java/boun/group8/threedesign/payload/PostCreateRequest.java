package boun.group8.threedesign.payload;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostCreateRequest {
    String title;
    String text;
    Long categoryId;
    Boolean isVisualPost;
    Long challengedPostId;
    Set<String> tags;
    MultipartFile file;

}
