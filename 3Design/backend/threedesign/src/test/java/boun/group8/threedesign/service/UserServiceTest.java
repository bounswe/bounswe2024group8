package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

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
                .isInstanceOf(ThreeDesignDatabaseException.class)
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
                .isInstanceOf(ThreeDesignDatabaseException.class)
                .hasMessageContaining("User not found with id: " + userId);
    }
}
