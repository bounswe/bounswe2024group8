package boun.group8.threedesign.achievements;

import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.UserAchievement;
import boun.group8.threedesign.repository.AchievementRepository;
import boun.group8.threedesign.repository.UserAchievementRepository;
import lombok.Getter;

@Getter
public abstract class BaseAchievement {

    private final long id;
    private final String name;
    private final String description;
    private final int point;

    final UserAchievementRepository userAchievementRepository;

    public BaseAchievement(long id, String name, String description, int point, UserAchievementRepository userAchievementRepository) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.point = point;
        this.userAchievementRepository = userAchievementRepository;
    }

    public abstract boolean meetsCriteria(User user);

    public void award(User user) {
        if (isAwarded(user)) {
            return;
        }

        if (meetsCriteria(user)) {
            UserAchievement userAchievement = UserAchievement.builder()
                    .userId(user.getId())
                    .achievementId(id)
                    .build();

            userAchievementRepository.save(userAchievement);

            // TODO increment user score with point when implemented
            //user.setScore(user.getScore() + point);
        }
    }

    public boolean isAwarded(User user) {
        return userAchievementRepository.getUserAchievementByUserIdAndAchievementId(user.getId(), id) != null;
    }
}
