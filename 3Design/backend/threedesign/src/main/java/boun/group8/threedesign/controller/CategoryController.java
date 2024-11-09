package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Category;
import boun.group8.threedesign.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
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
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }


//    @PutMapping("/change-password")
//    public ResponseEntity<Boolean> updatePassword(
//            @AuthenticationPrincipal User user,
//            @PathVariable Long userId,
//            @RequestParam String password) {
//
//        Boolean result = userService.updatePassword(user, userId, password);
//
//        return ResponseEntity.ok(result);
//    }




}