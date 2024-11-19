package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Category;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.UserCategory;
import boun.group8.threedesign.payload.GetCategoryResponse;
import boun.group8.threedesign.repository.CategoryRepository;
import boun.group8.threedesign.repository.UserCategoryRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryService {

    final CategoryRepository categoryRepository;

    final UserCategoryRepository userCategoryRepository;
    List<Category> categories;

    public CategoryService(final CategoryRepository categoryRepository,
                           final UserCategoryRepository userCategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.userCategoryRepository = userCategoryRepository;
        initializeCategories();
    }

    @Transactional
    public void initializeCategories() {
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

        updateCategories();
    }

    public List<Category> getCategories() {
        return new ArrayList<>(categories);
    }


    public Category getCategoryById(Long id) {
        Category category =  categories.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (category == null) {
            throw new ThreeDesignDatabaseException("Category not found with id: " + id);
        }

        return category;
    }

    @Transactional
    public void followCategory(User user, Long categoryId){

        UserCategory followExists = userCategoryRepository.findByUserIdAndCategoryId(user.getId(), categoryId);

        if(followExists != null){
            throw new ThreeDesignDatabaseException("User already follows this category");
        }

        Category category = getCategoryById(categoryId);

        UserCategory userCategory = UserCategory.builder()
                .userId(user.getId())
                .categoryId(category.getId())
                .build();

        userCategoryRepository.save(userCategory);

        category.setFollowerCount(category.getFollowerCount() + 1);

        categoryRepository.save(category);

        updateCategories();
    }

    @Transactional
    public void unfollowCategory(User user, Long categoryId){
        UserCategory followExists = userCategoryRepository.findByUserIdAndCategoryId(user.getId(), categoryId);

        if(followExists == null){
            throw new ThreeDesignDatabaseException("User does not follow this category");
        }

        userCategoryRepository.delete(followExists);

        Category category = getCategoryById(categoryId);

        category.setFollowerCount(category.getFollowerCount() - 1);

        categoryRepository.save(category);

        updateCategories();
    }

    private void updateCategories(){
        categories = categoryRepository.findAll();
    }

    public GetCategoryResponse getCategoryByIdWithFollowInfo(User user, Long id) {
        Category category = getCategoryById(id);

        UserCategory followExists = userCategoryRepository.findByUserIdAndCategoryId(user.getId(), id);

        return GetCategoryResponse.builder()
                .category(category)
                .isFollowed(followExists != null)
                .build();
    }
}


