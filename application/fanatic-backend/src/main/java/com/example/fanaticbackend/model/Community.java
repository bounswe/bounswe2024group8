package com.example.fanaticbackend.model;

import com.example.fanaticbackend.model.enums.Team;
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
@Table(name = "communities")
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Team team;

    @Column(name = "fanatic_count", nullable = false)
    Long fanaticCount = 0L;

}
