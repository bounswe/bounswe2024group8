package boun.group8.threedesign.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "annotations")
public class Annotation {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id;

        @Column(name = "starting_index", nullable = false)
        Integer startingIndex;

        @Column(name = "ending_index", nullable = false)
        Integer endingIndex;

        @Column(name = "content", nullable = false)
        String content;

        @Column(name = "post_id", nullable = true)
        Long postId;

        @Column(name = "comment_id", nullable = true)
        Long commentId;

        @Column(name = "user_id", nullable = false)
        Long userId;

        @CreationTimestamp
        @Column(name = "created", nullable = false)
        Timestamp created;

}
