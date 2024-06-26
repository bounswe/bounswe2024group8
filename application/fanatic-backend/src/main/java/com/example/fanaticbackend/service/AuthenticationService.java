package com.example.fanaticbackend.service;

import com.example.fanaticbackend.config.JwtService;
import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.Community;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.Role;
import com.example.fanaticbackend.payload.AuthenticationRequest;
import com.example.fanaticbackend.payload.AuthenticationResponse;
import com.example.fanaticbackend.payload.RegisterRequest;
import com.example.fanaticbackend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationService {

    final UserService userService;

    final UserRepository userRepository;

    final PasswordEncoder passwordEncoder;
    final JwtService jwtService;
    final AuthenticationManager authenticationManager;

    final CommunityService communityService;

    public AuthenticationResponse register(RegisterRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if (user != null) {
            throw new FanaticDatabaseException("User already exists with email: " + request.getEmail());
        }

        user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        User savedUser = communityService.joinCommunity(user, request.getFavoriteTeam().name());

//        User savedUser = userService.saveUser(user);

        String jwtToken = jwtService.generateToken(savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);

        return AuthenticationResponse.builder()
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .favoriteTeam(savedUser.getCommunity().getTeam())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail());

        if (user == null) throw new RuntimeException("User not found");

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthenticationResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .favoriteTeam(user.getCommunity().getTeam())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

}
