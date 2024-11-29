package boun.group8.threedesign.repository;


import boun.group8.threedesign.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {

    Achievement getAchievementById(Long id);

}
