package boun.group8.threedesign.payload;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserAchievementResponse {
    Long id;

    String name;

    String description;

    int point;

    Timestamp earnedAt;
}
