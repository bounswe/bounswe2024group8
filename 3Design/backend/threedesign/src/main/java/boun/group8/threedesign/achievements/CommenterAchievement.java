package boun.group8.threedesign.achievements;

import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.UserAchievement;
import boun.group8.threedesign.repository.CommentRepository;
import boun.group8.threedesign.repository.UserAchievementRepository;
import org.springframework.stereotype.Component;

@Component
public class CommenterAchievement extends BaseAchievement { // Comment 1 or more times

    final CommentRepository commentRepository;

    public CommenterAchievement(UserAchievementRepository userAchievementRepository, CommentRepository commentRepository) {
        super(1L, "Commenter", "Write your first comment!", 5, userAchievementRepository);
        this.commentRepository = commentRepository;
    }

    @Override
    public boolean meetsCriteria(User user) {
        // if user has commented 1 or more times, award the achievement
        return commentRepository.countByUserId(user.getId()) >= 1;

    }
}
