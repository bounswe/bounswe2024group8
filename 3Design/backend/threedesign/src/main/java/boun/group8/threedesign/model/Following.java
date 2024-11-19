package boun.group8.threedesign.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "followings", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"follower_user_id", "followed_user_id"})
})
public class Following {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "follower_user_id", nullable = false)
    Long followerUserId;

    @Column(name = "followed_user_id", nullable = false)
    Long followedUserId;
}
