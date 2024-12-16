package boun.group8.threedesign.integration;

import boun.group8.threedesign.model.Category;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.payload.AuthenticationRequest;
import boun.group8.threedesign.payload.AuthenticationResponse;
import boun.group8.threedesign.payload.PostCreateRequest;
import boun.group8.threedesign.payload.RegisterRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
        import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
@ActiveProfiles("test") 
public class IntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper; // For JSON serialization/deserialization

    private String baseUrl;

    private String accessToken;

    @BeforeEach
    void setUp() {
        baseUrl = "http://localhost:" + port + "/api/v1";

        // Register and authenticate the user to get an access token
        accessToken = authenticateUser("testuser@example.com", "password123");
    }

    @Test
    void shouldAuthorizeAndCreateNonVisualPostInFollowedCategory() {
        // Step 1: Get all categories
        List<Category> categories = fetchCategories();
        assertThat(categories).isNotEmpty();

        Long categoryId = (Long) categories.get(0).getId();

        // Step 2: Follow a category
        followCategory(categoryId);

        // Step 3: Create a non-visual post in the followed category
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        LinkedMultiValueMap<String, Object> requestMap = new LinkedMultiValueMap<>();
        requestMap.add("title", "Integration Test Post");
        requestMap.add("text", "This is a test post.");
        requestMap.add("categoryId", categoryId);
        requestMap.add("isVisualPost", false);
        requestMap.add("joinToTournament", false);
        requestMap.add("tags", Set.of("test", "integration"));

        HttpEntity<LinkedMultiValueMap<String, Object>> entity = new HttpEntity<>(requestMap, headers);
        ResponseEntity<Map> response = restTemplate.exchange(
                baseUrl + "/posts", HttpMethod.POST, entity, Map.class);

        // Assert that the post was created successfully
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().get("title")).isEqualTo("Integration Test Post");
        assertThat(response.getBody().get("text")).isEqualTo("This is a test post.");
    }

    private String authenticateUser(String email, String password) {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail(email);
        registerRequest.setPassword(password);
        registerRequest.setUserName("testuser");

        // Register the user
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<RegisterRequest> entity = new HttpEntity<>(registerRequest, headers);
        var registerResponse = restTemplate.postForEntity(baseUrl + "/auth/register", entity, Void.class);

        // Authenticate the user
        AuthenticationRequest authRequest = new AuthenticationRequest();
        authRequest.setEmail(email);
        authRequest.setPassword(password);
        HttpEntity<AuthenticationRequest> authEntity = new HttpEntity<>(authRequest, headers);

        ResponseEntity<AuthenticationResponse> response = restTemplate.postForEntity(
                baseUrl + "/auth/authenticate", authEntity, AuthenticationResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        return response.getBody().getAccessToken();
    }

    private List<Category> fetchCategories() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<List> response = restTemplate.exchange(
                baseUrl + "/categories", HttpMethod.GET, entity, List.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        // Turn body into list of Category
        List<Category> result = new ArrayList<>();

        for (Object category : response.getBody()) {
            result.add(objectMapper.convertValue(category, Category.class));
        }

        return result;

    }

    private void followCategory(Long categoryId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Void> response = restTemplate.exchange(
                baseUrl + "/categories/follow/" + categoryId, HttpMethod.POST, entity, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
