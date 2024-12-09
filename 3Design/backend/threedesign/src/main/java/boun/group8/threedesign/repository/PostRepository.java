package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.Post;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.payload.PostResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//TODO findAllUserReacted to gibi querylerde Unique gerekli mi?

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(Long userId);

    List<Post> findByCategoryId(Long categoryId);

    List<Post> findByTagsContaining(String tag);

    Post getPostById(Long id);

    @Query("SELECT p FROM Post p LEFT JOIN p.tags t WHERE LOWER(p.text) LIKE LOWER(CONCAT('%',:param,'%')) OR LOWER(p.title) LIKE LOWER(CONCAT('%',:param,'%')) OR LOWER(t) LIKE LOWER(CONCAT('%',:param,'%')) ORDER BY p.createdAt DESC")
    List<Post> findByTextLikeIgnoreCase(@Param("param") String param);

    //@Query("SELECT new boun.group8.threedesign.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.categoryId, p.isVisualPost, p.fileUrl, p.challengedPostId, p.tags, p.createdAt, " +
    //        "COALESCE(r.id, -1L), COALESCE(r.reactionType, boun.group8.threedesign.model.enums.ReactionType.NONE), COALESCE(r.bookmark, false)) " +
    //        "FROM Post p LEFT JOIN Reaction r ON p.id = r.post.id AND r.user = :user " +
    //        "WHERE p.categoryId IN (SELECT uc.categoryId FROM UserCategory uc WHERE uc.userId = :userId) "  +
    //        "ORDER BY p.id DESC")
    //List<PostResponse> findAllPostsAndUserReactionsByUserDefault(@Param("user") User user, @Param("userId") Long userId);

    @Query("SELECT p FROM Post p WHERE p.categoryId IN (SELECT uc.categoryId FROM UserCategory uc WHERE uc.userId = :userId)"+
            "OR p.user.id IN (SELECT f.followedUserId FROM Following f WHERE f.followerUserId = :userId) ORDER BY p.id DESC")
    List<Post> findAllPostsByUserDefault(@Param("userId") Long userId);



    //@Query("SELECT new boun.group8.threedesign.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.categoryId, p.isVisualPost, p.fileUrl, p.challengedPostId, p.tags, p.createdAt, " +
    //        "COALESCE(r.id, -1L), COALESCE(r.reactionType, boun.group8.threedesign.model.enums.ReactionType.NONE), COALESCE(r.bookmark, false)) " +
    //        "FROM Post p LEFT JOIN Reaction r ON p.id = r.post.id AND r.user = :user " +
    //        "WHERE p.categoryId = :categoryId AND p.isVisualPost = true " +
    //        "ORDER BY p.id DESC")
    //List<PostResponse> findVisualPostsAndUserReactionsByUserAndByCategory(@Param("user") User user, @Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Post p WHERE p.categoryId = :categoryId AND p.isVisualPost = true ORDER BY p.id DESC")
    List<Post> findVisualPostsByCategory(@Param("categoryId") Long categoryId);



    //@Query("SELECT new boun.group8.threedesign.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.categoryId, p.isVisualPost, p.fileUrl, p.challengedPostId, p.tags, p.createdAt, " +
    //        "COALESCE(r.id, -1L), COALESCE(r.reactionType, boun.group8.threedesign.model.enums.ReactionType.NONE), COALESCE(r.bookmark, false)) " +
    //        "FROM Post p LEFT JOIN Reaction r ON p.id = r.post.id AND r.user = :user " +
    //        "WHERE p.categoryId = :categoryId AND p.isVisualPost = false " +
    //        "ORDER BY p.id DESC")
    //List<PostResponse> findNonVisualPostsAndUserReactionsByUserAndByCategory(@Param("user") User user, @Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Post p WHERE p.categoryId = :categoryId AND p.isVisualPost = false ORDER BY p.id DESC")
    List<Post> findNonVisualPostsByCategory(@Param("categoryId") Long categoryId);



    //@Query("SELECT new boun.group8.threedesign.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.categoryId, p.isVisualPost, p.fileUrl, p.challengedPostId, p.tags, p.createdAt, " +
    //        "COALESCE(r.id, -1L), COALESCE(r.reactionType, boun.group8.threedesign.model.enums.ReactionType.NONE), COALESCE(r.bookmark, false)) " +
    //        "FROM Post p LEFT JOIN Reaction r ON p.id = r.post.id AND r.user = :user " +
    //        "WHERE p.user.id = :postedBy " +
    //        "ORDER BY p.id DESC")
    //List<PostResponse> findAllPostsAndUserReactionsByUserAndPostedByAUser(@Param("user") User user, @Param("postedBy") Long userId);

    @Query("SELECT p FROM Post p WHERE p.user.id = :postedBy ORDER BY p.id DESC")
    List<Post> findAllPostsByAUser(@Param("postedBy") Long userId);



    @Query("SELECT p FROM Post p JOIN Reaction r ON p.id = r.post.id AND r.user = :user")
    List<Post> findAllByUserReactedTo(@Param("user") User user);



    //@Query("SELECT new boun.group8.threedesign.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.categoryId, p.isVisualPost, p.fileUrl, p.challengedPostId, p.tags, p.createdAt, " +
    //        "COALESCE(r.id, -1L), COALESCE(r.reactionType, boun.group8.threedesign.model.enums.ReactionType.NONE), COALESCE(r.bookmark, false)) " +
    //        "FROM Post p JOIN Reaction r ON p.id = r.post.id " +
    //        "WHERE r.user.id = :userId AND r.bookmark = true " +
    //        "ORDER BY p.id DESC")
    //List<PostResponse> findAllBookmarkedPosts(@Param("userId") Long userId);

    @Query("SELECT p FROM Post p JOIN Reaction r ON p.id = r.post.id WHERE r.user.id = :userId AND r.bookmark = true")
    List<Post> findAllBookmarkedPosts(@Param("userId") Long userId);

    int countByUserId(Long userId);


}
