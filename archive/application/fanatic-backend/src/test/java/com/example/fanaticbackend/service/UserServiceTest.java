package com.example.fanaticbackend.service;

import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    public void getUserByEmail_ShouldReturnUser_WhenUserExists() {
        // Arrange
        String email = "user@example.com";
        User expectedUser = User.builder()
                .id(1L)
                .email(email)
                .password("password")
                .build();
        when(userRepository.findByEmail(email)).thenReturn(expectedUser);

        // Act
        User result = userService.getUserByEmail(email);

        // Assert
        assertEquals(expectedUser, result);
    }

    @Test
    public void getUserByEmail_ShouldThrowException_WhenUserNotFound() {
        // Arrange
        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(null);

        // Act & Assert
        assertThatThrownBy(() -> userService.getUserByEmail(email))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("User not found with email: " + email);
    }

    @Test
    public void getUserById_ShouldReturnUser_WhenUserExists() {
        // Arrange
        Long userId = 1L;
        User expectedUser = User.builder()
                .id(1L)
                .password("password")
                .build();

        when(userRepository.findUserById(userId)).thenReturn(expectedUser);

        // Act
        User result = userService.getUserById(userId);

        // Assert
        assertEquals(expectedUser, result);
    }

    @Test
    public void getUserById_ShouldThrowException_WhenUserNotFound() {
        // Arrange
        Long userId = 999L;
        when(userRepository.findUserById(userId)).thenReturn(null);

        // Act & Assert
        assertThatThrownBy(() -> userService.getUserById(userId))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("User not found with id: " + userId);
    }

    @Test
    public void updateProfilePicture_ShouldUpdateProfilePicture_WhenUserMatchesId() throws Exception {
        // Arrange
        Long userId = 1L;
        User expectedUser = User.builder()
                .id(1L)
                .password("password")
                .build();

        MultipartFile profilePicture = mock(MultipartFile.class);

        when(profilePicture.getBytes()).thenReturn(new byte[] { 1, 2, 3, 4 });

        // Act
        Boolean result = userService.updateProfilePicture(expectedUser, userId, profilePicture);

        // Assert
        assertEquals(true, result);

        verify(userRepository).save(expectedUser);
    }

    @Test
    public void updateProfilePicture_ShouldThrowException_WhenUserDoesNotMatchId() {
        // Arrange
        User user = User.builder()
                .id(1L)
                .password("password")
                .build();
        Long wrongId = 2L;

        MultipartFile profilePicture = mock(MultipartFile.class);

        // Act & Assert
        assertThatThrownBy(() -> userService.updateProfilePicture(user, wrongId, profilePicture))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("You can only update your own profile picture");
    }

    @Test
    public void updateProfilePicture_ShouldThrowException_WhenCannotSetProfilePicture() throws IOException {
        // Arrange
        User user = User.builder()
                .id(1L)
                .password("password")
                .build();
        Long userId = 1L;

        MultipartFile profilePicture = mock(MultipartFile.class);

        when(profilePicture.getBytes()).thenThrow(new IOException());
        // Act & Assert
        assertThatThrownBy(() -> userService.updateProfilePicture(user, userId, profilePicture))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("Error while updating profile picture");
    }

    @Test
    public void updatePassword_ShouldUpdatePassword_WhenUserMatchesId() {
        // Arrange
        Long userId = 1L;
        User user = User.builder()
                .id(userId)
                .password("password")
                .build();

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        String newPassword = "newPassword";

        // Act
        Boolean result = userService.updatePassword(user, userId, newPassword);

        // Assert
        assertEquals(true, result);
        verify(passwordEncoder).encode(newPassword);
        verify(userRepository).save(user);
    }

    @Test
    public void updatePassword_ShouldThrowException_WhenUserDoesNotMatchId() {
        // Arrange
        User user = User.builder()
                .id(1L)
                .password("password")
                .build();

        Long wrongId = 2L;
        String newPassword = "newPassword";

        // Act & Assert
        assertThatThrownBy(() -> userService.updatePassword(user, wrongId, newPassword))
                .isInstanceOf(FanaticDatabaseException.class)
                .hasMessageContaining("You can only update your own password");
    }



}
