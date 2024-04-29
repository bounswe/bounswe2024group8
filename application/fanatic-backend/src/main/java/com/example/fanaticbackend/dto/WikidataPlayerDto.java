package com.example.fanaticbackend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WikidataPlayerDto {

    String playerName;

    String position;

    String teamName;



}
