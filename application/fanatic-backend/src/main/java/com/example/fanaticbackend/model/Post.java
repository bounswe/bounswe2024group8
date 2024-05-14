package com.example.fanaticbackend.model;

import com.example.fanaticbackend.model.enums.Team;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Set;
import java.util.HashSet;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    Team teamName;

    @Column(nullable = false)
    String text;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @Column(name = "title", nullable = false)
    String title;

    @Column(name = "likes", columnDefinition = "int default 0")
    Integer likes;

    @Column(name = "dislikes", columnDefinition = "int default 0")
    Integer dislikes;

    @Column(name = "comments", columnDefinition = "int default 0")
    Integer comments;

}
