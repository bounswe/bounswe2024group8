package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Category;
import boun.group8.threedesign.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryService {

    final CategoryRepository categoryRepository;

    public CategoryService(final CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
        initializeCategories();
    }

    private void initializeCategories() {
        List<Category> dbCategories = categoryRepository.findAll();

        List<Long> enumIds = Arrays.stream(boun.group8.threedesign.model.enums.Category.values())
                .map(boun.group8.threedesign.model.enums.Category::getId)
                .toList();

        List<Category> addOrUpdateCategories = new ArrayList<>();
        List<Category> deleteCategories = new ArrayList<>();

        dbCategories.forEach(category -> {
            if (!enumIds.contains(category.getId())) {
                deleteCategories.add(category);
            }

            boun.group8.threedesign.model.enums.Category enumCategory = boun.group8.threedesign.model.enums.Category.getById(category.getId());

            if (enumCategory == null) {
                return;
            }

            if (!category.getName().equals(enumCategory.getName()) || !category.getDescription().equals(enumCategory.getDescription())) {
                category.setName(enumCategory.getName());
                category.setDescription(enumCategory.getDescription());
                addOrUpdateCategories.add(category);
            }

        });

        enumIds.forEach(id -> {
            if (dbCategories.stream().noneMatch(category -> category.getId().equals(id))) {
                boun.group8.threedesign.model.enums.Category category = boun.group8.threedesign.model.enums.Category.getById(id);

                if (category == null) {
                    return;
                }

                addOrUpdateCategories.add(Category.builder()
                        .id(id)
                        .name(category.getName())
                        .description(category.getDescription())
                        .followerCount(0)
                        .build());
            }
        });

        categoryRepository.saveAll(addOrUpdateCategories);
        categoryRepository.deleteAll(deleteCategories);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ThreeDesignDatabaseException("Category not found with ID: " + id));
    }

}


