package boun.group8.threedesign.model.enums;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.UserAchievement;
import boun.group8.threedesign.repository.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum Achievement {

    FRESHMAN(1L, "Freshman", "Create an account", 10) {
        @Override
        public boolean meetsCriteria(User user) {
            return userRepository.findById(user.getId()).isPresent();
        }
    },

    COMMENTER(2L, "Commenter", "Comment on a design", 10) {
        @Override
        public boolean meetsCriteria(User user) {
            return commentRepository.countByUserId(user.getId()) >= 1;
        }
    },

    WARMUP(3L, "Warming up", "Create a post", 10) {
        @Override
        public boolean meetsCriteria(User user) {
            return postRepository.countByUserId(user.getId()) >= 1;
        }
    },

    REACTOR(4L, "Reactor", "React to a design", 10) {
        @Override
        public boolean meetsCriteria(User user) {
            return reactionRepository.countByUserId(user.getId()) >= 1;
        }
    },

    BOOKWORM(5L, "Bookworm", "Bookmark a design", 10) {
        @Override
        public boolean meetsCriteria(User user) { return reactionRepository.countByUserIdAndBookmark(user.getId(), true) >= 1; }
    },

    CRITIC(6L, "Critic", "Dislike a design", 10) {
        @Override
        public boolean meetsCriteria(User user) { return reactionRepository.countByUserIdAndReactionType(user.getId(), ReactionType.DISLIKE) >= 1; }
    },

    ICON(7L, "Icon", "Have 5 followers", 10) {
        @Override
        public boolean meetsCriteria(User user) { return followingRepository.countByFollowedUserId(user.getId()) >= 5; }
    },

    CHALLENGER(8L, "Challenger", "Challenge a post", 10) {
        @Override
        public boolean meetsCriteria(User user) { return postRepository.countChallengingPostsByUser(user.getId()) >= 5; }
    },

    GENIUS(9L, "Genius", "Annotate a design", 10) {
        @Override
        public boolean meetsCriteria(User user) { return annotationRepository.countByUserId(user.getId()) >= 1; }
    },

    ARTIST(10L, "Artist", "Receive 5 likes with a post", 10) {
        @Override
        public boolean meetsCriteria(User user) { return postRepository.countByUserIdAndAndLikes(user.getId(), 5) >= 1; }
    },
    ;

    private final long id;
    private final String name;
    private final String description;
    private final int point;

    public UserAchievementRepository userAchievementRepository;
    public CommentRepository commentRepository;
    public PostRepository postRepository;
    public ReactionRepository reactionRepository;
    public AnnotationRepository annotationRepository;
    public UserRepository userRepository;
    public FollowingRepository followingRepository;


    Achievement(long id, String name, String description, int point) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.point = point;
    }

    public void setRepositories(UserAchievementRepository userAchievementRepository, CommentRepository commentRepository, PostRepository postRepository, ReactionRepository reactionRepository, AnnotationRepository annotationRepository, UserRepository userRepository, FollowingRepository followingRepository) {
        this.userAchievementRepository = userAchievementRepository;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.reactionRepository = reactionRepository;
        this.annotationRepository = annotationRepository;
        this.userRepository = userRepository;
        this.followingRepository = followingRepository;
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

            user.setExperience(user.getExperience() + point);

            try {
                userRepository.save(user);
            } catch (Exception e) {
                throw new ThreeDesignDatabaseException("Failed to award achievement", e);
            }
        }
    }

    public boolean isAwarded(User user) {
        return userAchievementRepository.getUserAchievementByUserIdAndAchievementId(user.getId(), id) != null;
    }

    public static Achievement getById(Long id) {
        for (Achievement achievement : Achievement.values()) {
            if (achievement.getId() == id) {
                return achievement;
            }
        }
        return null;
    }
}
