package boun.group8.threedesign.model;

import boun.group8.threedesign.model.enums.Category;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

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

    //Relation for category
    @Column(name = "category_id", nullable = false)
    Long categoryId;

    @Column(name = "is_visual_post", nullable = false, columnDefinition = "boolean default False")
    Boolean isVisualPost;

    @Column(name = "file_url")
    String fileUrl;

    @Column(name = "challenged_post_id")
    Long challengedPostId;

    @ElementCollection
    @CollectionTable(name = "tags", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "tag")
    Set<String> tags = new HashSet<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    Timestamp createdAt;

}