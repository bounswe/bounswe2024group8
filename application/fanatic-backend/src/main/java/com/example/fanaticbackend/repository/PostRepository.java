package com.example.fanaticbackend.repository;


import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.PostResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    //@Query("SELECT p FROM Post p WHERE p.teamName = ?1 OR p.text = ?2")
    //Post findByTeamNameLikeIgnoreCaseOrTextLike(Team teamName, String text);

    @Query("SELECT p FROM Post p WHERE LOWER(p.text) LIKE LOWER(CONCAT('%',:param,'%')) OR LOWER(p.title) LIKE LOWER(CONCAT('%',:param,'%'))")
    List<Post> findByTextLikeIgnoreCase(String param);

    @Query("SELECT p FROM Post p WHERE lower(p.text) LIKE lower(concat('%', :param1, '%')) OR lower(p.text) LIKE lower(concat('%', :param2, '%')) OR lower(p.title) LIKE lower(concat('%', :param1, '%')) OR lower(p.title) LIKE lower(concat('%', :param2, '%'))")
    List<Post> findByTextLikeIgnoreCaseParams(String param1, String param2);

    List<Post> findAllByOrderByIdDesc();

    Post findPostById(Long id);

    List<Post> findByPostedAtOrderByIdDesc(Team postedAt);


    @Query("SELECT new com.example.fanaticbackend.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.postedAt, p.image, p.createdAt, " +
            "COALESCE(r.id, -1L), COALESCE(r.reactionType, com.example.fanaticbackend.model.enums.ReactionType.NONE), COALESCE(r.bookmark, false)) " +
            "FROM Post p LEFT JOIN Reaction r ON p.id = r.post.id AND r.user = :user " +
            "ORDER BY p.id DESC")
    List<PostResponse> findAllPostsAndUserReactionsByUserDefault(@Param("user") User user);


    @Query("SELECT new com.example.fanaticbackend.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.postedAt, p.image, p.createdAt, " +
            "COALESCE(r.id, -1L), COALESCE(r.reactionType, com.example.fanaticbackend.model.enums.ReactionType.NONE), COALESCE(r.bookmark, false)) " +
            "FROM Post p LEFT JOIN Reaction r ON p.id = r.post.id AND r.user = :user " +
            "WHERE p.postedAt = :community " +
            "ORDER BY p.id DESC")
    List<PostResponse> findAllPostsAndUserReactionsByUserAndByCommunity(@Param("user") User user, @Param("community") Team community);



//     This only return the posts that the user has reacted to
    @Query("SELECT new com.example.fanaticbackend.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.postedAt, p.image, p.createdAt, " +
            "r.id, r.reactionType, r.bookmark) " +
            "FROM Post p JOIN Reaction r ON p.id = r.post.id AND r.user = :user " +
            "ORDER BY p.id DESC")
    List<PostResponse> findAllPostsAndUserReactionsByUserReactedTo(@Param("user") User user);


    @Query("SELECT p FROM Post p JOIN Reaction r ON p.id = r.post.id AND r.user = :user")
    List<Post> findAllByUserReactedTo(@Param("user") User user);

    @Query("SELECT new com.example.fanaticbackend.payload.PostResponse(p.id, p.text, p.user, p.title, p.likes, p.dislikes, p.comments, p.postedAt, p.image, p.createdAt, " +
            "COALESCE(r.id, -1L), COALESCE(r.reactionType, com.example.fanaticbackend.model.enums.ReactionType.NONE), COALESCE(r.bookmark, false)) " +
            "FROM Post p LEFT JOIN Reaction r ON p.id = r.post.id AND r.user = :user " +
            "WHERE p.user.id = :postedBy " +
            "ORDER BY p.id DESC")
    List<PostResponse> findAllPostsAndUserReactionsByUserAndPostedByAUser(@Param("user") User user, @Param("postedBy") Long postedBy);


}
