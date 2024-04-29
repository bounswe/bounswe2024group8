package com.example.fanaticbackend.service;

import com.example.fanaticbackend.config.JwtService;
import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
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

        User savedUser = userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

//        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
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
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

}
