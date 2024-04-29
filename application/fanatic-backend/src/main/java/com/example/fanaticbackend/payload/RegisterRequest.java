package com.example.fanaticbackend.payload;

import com.example.fanaticbackend.model.enums.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {

    String firstName;

    String lastName;

    String email;

    String password;
}
