package com.example.fanaticbackend.payload;

import com.example.fanaticbackend.model.enums.Team;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostCreateRequest {

    @NotEmpty
    String title;

    @NotEmpty
    String text;

    //Tags
    String teamName;

    MultipartFile image;

    @NotNull
    Team postedAt;
}
