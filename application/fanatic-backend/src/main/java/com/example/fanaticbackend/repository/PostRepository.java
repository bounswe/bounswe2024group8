package com.example.fanaticbackend.repository;


import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.teamName = ?1 OR p.text = ?1")
    Post findByTeamNameLikeIgnoreCaseOrTextLike(Team teamName);

}
