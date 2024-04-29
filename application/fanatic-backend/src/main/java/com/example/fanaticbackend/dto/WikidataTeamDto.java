package com.example.fanaticbackend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WikidataTeamDto {

    String teamName;

    String description;

    String logoUrl;

    Integer year;

    String coachName;
}
