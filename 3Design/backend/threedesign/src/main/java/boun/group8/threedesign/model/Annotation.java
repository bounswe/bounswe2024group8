package boun.group8.threedesign.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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

        @Column(name = "post_id", nullable = false)
        Long postId;

//        @Column(name = "user_id", nullable = false)
//        Long userId;

}