package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {

    UserCategory findByUserIdAndCategoryId(Long userId, Long categoryId);
}
