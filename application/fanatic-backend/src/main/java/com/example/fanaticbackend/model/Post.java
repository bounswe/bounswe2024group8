package com.example.fanaticbackend.model;

import com.example.fanaticbackend.model.enums.Team;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
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

    @Column(nullable = false)
    String text;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @Column(name = "title", nullable = false)
    String title;

    @Column(name = "likes", columnDefinition = "int default 0")
    Integer likes = 0;

    @Column(name = "dislikes", columnDefinition = "int default 0")
    Integer dislikes = 0;

    @Column(name = "comments", columnDefinition = "int default 0")
    Integer comments = 0;

    @Column(name = "posted_at", nullable = false)
    @Enumerated(EnumType.STRING)
    Team postedAt;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    Timestamp createdAt;

}
