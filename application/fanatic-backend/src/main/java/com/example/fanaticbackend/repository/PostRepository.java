package com.example.fanaticbackend.repository;


import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    //@Query("SELECT p FROM Post p WHERE p.teamName = ?1 OR p.text = ?2")
    //Post findByTeamNameLikeIgnoreCaseOrTextLike(Team teamName, String text);

    @Query("SELECT p FROM Post p WHERE LOWER(p.text) LIKE LOWER(CONCAT('%',:param,'%')) OR LOWER(p.title) LIKE LOWER(CONCAT('%',:param,'%'))")
    List<Post> findByTextLikeIgnoreCase(String param);

    List<Post> findAllByOrderByIdDesc();


}
