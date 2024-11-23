package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Achievement;
import boun.group8.threedesign.model.UserAchievement;
import boun.group8.threedesign.payload.UserAchievementResponse;
import boun.group8.threedesign.service.AchievementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/achievements")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AchievementController {

    final AchievementService achievementService;

    @GetMapping
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        List<Achievement> achievements = achievementService.getAchievements();

        if (achievements.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(achievements);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserAchievementResponse>> getUserAchievements(@PathVariable Long userId) {
        List<UserAchievementResponse> userAchievements = achievementService.getAchievementsByUserId(userId);

        if (userAchievements.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(userAchievements);
    }
}
