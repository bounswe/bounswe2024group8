package boun.group8.threedesign.service;

import boun.group8.threedesign.model.Achievement;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.UserAchievement;
import boun.group8.threedesign.payload.UserAchievementResponse;
import boun.group8.threedesign.repository.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AchievementService {

    final AchievementRepository achievementRepository;
    final UserAchievementRepository userAchievementRepository;
    final CommentRepository commentRepository;
    final PostRepository postRepository;
    final ReactionRepository reactionRepository;
    final AnnotationRepository annotationRepository;
    final UserRepository userRepository;

    List<Achievement> achievements;

    public AchievementService(final AchievementRepository achievementRepository,
                              final UserAchievementRepository userAchievementRepository, final CommentRepository commentRepository, PostRepository postRepository, ReactionRepository reactionRepository, AnnotationRepository annotationRepository, UserRepository userRepository) {
        this.achievementRepository = achievementRepository;
        this.userAchievementRepository = userAchievementRepository;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.reactionRepository = reactionRepository;
        this.annotationRepository = annotationRepository;
        this.userRepository = userRepository;
        initializeAchievements();
    }

    public void initializeAchievements() {
        List<Achievement> dbAchievements = achievementRepository.findAll();

        List<Long> enumIds = Arrays.stream(boun.group8.threedesign.model.enums.Achievement.values())
                .map(boun.group8.threedesign.model.enums.Achievement::getId)
                .toList();

        List<Achievement> addOrUpdateAchievements = new ArrayList<>();
        List<Achievement> deleteAchievements = new ArrayList<>();

        dbAchievements.forEach(achievement -> {
            if (!enumIds.contains(achievement.getId())) {
                deleteAchievements.add(achievement);
            }

            boun.group8.threedesign.model.enums.Achievement enumAchievement = boun.group8.threedesign.model.enums.Achievement.getById(achievement.getId());

            if (enumAchievement == null) {
                return;
            }

            if (!achievement.getName().equals(enumAchievement.getName()) || !achievement.getDescription().equals(enumAchievement.getDescription()) || achievement.getPoint() != enumAchievement.getPoint()) {
                achievement.setName(enumAchievement.getName());
                achievement.setDescription(enumAchievement.getDescription());
                achievement.setPoint(enumAchievement.getPoint());
                addOrUpdateAchievements.add(achievement);
            }

        });

        enumIds.forEach(id -> {
            if (dbAchievements.stream().noneMatch(achievement -> achievement.getId().equals(id))) {
                boun.group8.threedesign.model.enums.Achievement enumAchievement = boun.group8.threedesign.model.enums.Achievement.getById(id);

                Achievement achievement = Achievement.builder()
                        .id(id)
                        .name(enumAchievement.getName())
                        .description(enumAchievement.getDescription())
                        .point(enumAchievement.getPoint())
                        .build();

                addOrUpdateAchievements.add(achievement);
            }
        });

        achievementRepository.saveAll(addOrUpdateAchievements);
        achievementRepository.deleteAll(deleteAchievements);

        updateAchievements();

        for (boun.group8.threedesign.model.enums.Achievement achievement : boun.group8.threedesign.model.enums.Achievement.values()) {
            achievement.setRepositories(userAchievementRepository, commentRepository, postRepository, reactionRepository, annotationRepository, userRepository);
        }

    }

    public void updateAchievements() {
        achievements = achievementRepository.findAll();
    }



    public List<Achievement> getAchievements() {
        return new ArrayList<>(achievements);
    }

    public List<UserAchievementResponse> getAchievementsByUserId(Long userId) {
        return userAchievementRepository.getUserAchievementResponseByUserId(userId);
    }

    @Scheduled(fixedRate = 60000) // Run every 60 seconds
    public void awardAchievements() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            for (boun.group8.threedesign.model.enums.Achievement achievement : boun.group8.threedesign.model.enums.Achievement.values()) {
                achievement.award(user);
            }
        }
    }
}
