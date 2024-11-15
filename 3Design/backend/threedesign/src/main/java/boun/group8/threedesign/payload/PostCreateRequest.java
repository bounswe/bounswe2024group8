package boun.group8.threedesign.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotBlank(message = "Title cannot be blank")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    String title;

    @NotBlank(message = "Text cannot be blank")
    String text;

    @NotNull(message = "Category ID cannot be null")
    Long categoryId;

    @NotNull(message = "Visual post flag must be provided")
    Boolean isVisualPost;

    Long challengedPostId;

    Set<String> tags;

    MultipartFile file;

    @NotNull(message = "Tournament flag must be provided")
    Boolean joinToTournament;

}
