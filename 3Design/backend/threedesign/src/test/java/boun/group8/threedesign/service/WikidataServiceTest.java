package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.Reaction;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;
import boun.group8.threedesign.payload.PostCreateRequest;
import boun.group8.threedesign.payload.PostResponse;
import boun.group8.threedesign.payload.ReactionRequest;
import boun.group8.threedesign.payload.ReactionResponse;
import boun.group8.threedesign.repository.CategoryRepository;
import boun.group8.threedesign.repository.PostRepository;
import boun.group8.threedesign.repository.ReactionRepository;
import boun.group8.threedesign.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class WikidataServiceTest {

    @InjectMocks
    private WikidataService wikidataService;

    @Test
    public void fetchParentClasses_ReturnsExpectedValues_WhenKeyword() {
        // Act
        Map<String, String> result = wikidataService.fetchParentClasses("statue");

        // Assert
        assertEquals(3, result.size());
        assertTrue(result.containsValue("sculpture"));
        assertTrue(result.containsValue("artificial physical object"));
        assertTrue(result.containsValue("figure"));
    }

    @Test
    public void getAllSiblings_ReturnsExpectedSize_WhenKeyword() {
        // Act
        List<String> result = wikidataService.getAllSiblings("statue");

        // Assert
        assertEquals(15, result.size(), "The result list size should be 15");
        System.out.println(result);
    }

    @Test
    public void fetchSiblings_ReturnsExpectedValues_WhenParentClassAndKeywordAreGiven() {
        // Act
        List<String> result = wikidataService.fetchSiblings("http://www.wikidata.org/entity/Q860861", "statue");

        // Assert
        assertEquals(5, result.size());
        assertTrue(result.contains("Namoradeira"));
        assertTrue(result.contains("cantoria"));
        assertTrue(result.contains("carved ornament"));
        assertTrue(result.contains("sculpture of Tiki"));
        assertTrue(result.contains("decorative wall"));
    }
}