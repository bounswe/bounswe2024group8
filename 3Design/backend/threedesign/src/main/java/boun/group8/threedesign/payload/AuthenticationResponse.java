package boun.group8.threedesign.payload;

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

    String userName;

    String accessToken;

    String refreshToken;

}
