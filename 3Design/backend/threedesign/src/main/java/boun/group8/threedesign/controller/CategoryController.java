package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Category;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.GetCategoryResponse;
import boun.group8.threedesign.service.CategoryService;
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


    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {

        List<Category> categories = categoryService.getCategories();

        if (categories.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(categories);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {

        Category category = categoryService.getCategoryById(id);

        return ResponseEntity.ok(category);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<GetCategoryResponse> getCategoryByIdWithFollowInfo(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {

        GetCategoryResponse category = categoryService.getCategoryByIdWithFollowInfo(user, id);

        return ResponseEntity.ok(category);
    }

    @PostMapping("/follow/{id}")
    public ResponseEntity followCategory(@AuthenticationPrincipal User user, @PathVariable Long id) {

        categoryService.followCategory(user, id);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/unfollow/{id}")
    public ResponseEntity unfollowCategory(@AuthenticationPrincipal User user, @PathVariable Long id) {

        categoryService.unfollowCategory(user, id);

        return ResponseEntity.ok().build();
    }


}