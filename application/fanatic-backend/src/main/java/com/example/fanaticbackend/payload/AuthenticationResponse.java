package com.example.fanaticbackend.payload;

import com.example.fanaticbackend.model.enums.Team;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {

    Long userId;

    String email;

    String firstName;

    String lastName;

    Team favoriteTeam;

    String accessToken;

    String refreshToken;

}