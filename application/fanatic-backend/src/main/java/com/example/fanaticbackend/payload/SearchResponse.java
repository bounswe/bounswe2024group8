package com.example.fanaticbackend.payload;

import com.example.fanaticbackend.dto.WikidataTeamDto;
import com.example.fanaticbackend.model.Post;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchResponse {

    WikidataTeamDto team;

    List<PostResponse> posts;

}
