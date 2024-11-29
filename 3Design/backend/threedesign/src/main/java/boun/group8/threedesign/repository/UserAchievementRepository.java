package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.UserAchievement;
import boun.group8.threedesign.payload.UserAchievementResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {

    UserAchievement getUserAchievementByUserIdAndAchievementId(Long userId, Long achievementId);

    List<UserAchievement> getUserAchievementByUserId(Long userId);

    @Query("SELECT new boun.group8.threedesign.payload.UserAchievementResponse(ua.achievementId, a.name, a.description, "+
            "a.point, ua.earnedAt) FROM UserAchievement ua JOIN Achievement a ON ua.achievementId = a.id WHERE ua.userId = :userId")
    List<UserAchievementResponse> getUserAchievementResponseByUserId(@Param("userId") Long userId);
}
