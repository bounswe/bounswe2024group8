package boun.group8.threedesign.util;

import boun.group8.threedesign.model.Comment;
import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.Reaction;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.model.enums.ReactionType;

public class TestDataBuilder {

    // Create a mock User
    public static User createUser(Long userId) {
        User user = new User();
        user.setId(userId);
        return user;
    }

    // Create a mock Comment
    public static Comment createComment(Long commentId, Long userId, int likes, int dislikes) {
        Comment comment = new Comment();
        comment.setId(commentId);
        comment.setLikes(likes);
        comment.setDislikes(dislikes);
        comment.setUser(createUser(userId));
        return comment;
    }

    // Create a mock Reaction
    public static Reaction createReaction(Long reactionId, ReactionType reactionType, Long userId, Long commentId) {
        Reaction reaction = new Reaction();
        reaction.setId(reactionId);
        reaction.setReactionType(reactionType);
        reaction.setUser(createUser(userId));
        reaction.setComment(createComment(commentId, userId, 0, 0));  // Comment ID is also passed
        return reaction;
    }

    // Create a mock Post
    public static Post createPost(Long postId, Long userId) {
        Post post = new Post();
        post.setId(postId);
        post.setUser(createUser(userId));
        return post;
    }
}
