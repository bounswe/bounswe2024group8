package com.example.fanaticbackend.repository;


import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.Team;
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

}
