package boun.group8.threedesign.payload;

import boun.group8.threedesign.model.Category;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetCategoryResponse {

    Category category;

    Boolean isFollowed;
}
