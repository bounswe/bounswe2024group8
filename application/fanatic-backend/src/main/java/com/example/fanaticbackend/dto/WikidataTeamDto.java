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

    String logoUrl;

    Integer year;

    String coachName;

    String location;
}
