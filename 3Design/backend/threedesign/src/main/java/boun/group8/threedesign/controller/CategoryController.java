package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Category;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.GetCategoryResponse;
import boun.group8.threedesign.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Delegate;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryController {

    final CategoryService categoryService;


    @Operation(summary = "Get all categories", description = "Fetches all available categories in the system.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of categories retrieved successfully"),
            @ApiResponse(responseCode = "204", description = "No categories found")
    })
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getCategories();
        if (categories.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(categories);
    }

    @Operation(summary = "Get category by ID", description = "Fetches details of a specific category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @Operation(summary = "Get category by ID with follow info", description = "Fetches a category by its ID, including follow information for the authenticated user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @GetMapping("/get/{id}")
    public ResponseEntity<GetCategoryResponse> getCategoryByIdWithFollowInfo(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        GetCategoryResponse category = categoryService.getCategoryByIdWithFollowInfo(user, id);
        return ResponseEntity.ok(category);
    }

    @Operation(summary = "Follow a category", description = "Allows the authenticated user to follow a specific category.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category followed successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid category ID")
    })
    @PostMapping("/follow/{id}")
    public ResponseEntity<Void> followCategory(@AuthenticationPrincipal User user, @PathVariable Long id) {
        categoryService.followCategory(user, id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Unfollow a category", description = "Allows the authenticated user to unfollow a specific category.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category unfollowed successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid category ID")
    })
    @DeleteMapping("/unfollow/{id}")
    public ResponseEntity<Void> unfollowCategory(@AuthenticationPrincipal User user, @PathVariable Long id) {
        categoryService.unfollowCategory(user, id);
        return ResponseEntity.ok().build();
    }

}
