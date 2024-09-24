package com.example.fanaticbackend.payload;

import com.example.fanaticbackend.model.enums.Role;
import com.example.fanaticbackend.model.enums.Team;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {

    @NotEmpty
    String firstName;

    @NotEmpty
    String lastName;

    @NotEmpty
    @Email(message = "Please provide a valid email address")
    String email;

    @NotEmpty
    String password;

    @NotNull
    Team favoriteTeam;
}
