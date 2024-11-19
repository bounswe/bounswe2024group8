package boun.group8.threedesign.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tournament_entry", indexes = {
        @Index(name = "idx_tournament_entry_score", columnList = "tournament_id , score DESC")
})
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TournamentEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id",  nullable = false)
    User user;

    @Column(name = "post_id",nullable = false)
    Long postId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tournament_id", referencedColumnName = "id", nullable = false)
    Tournament tournament;

    @Column(nullable = false, columnDefinition = "integer default 0")
    Integer score;
}