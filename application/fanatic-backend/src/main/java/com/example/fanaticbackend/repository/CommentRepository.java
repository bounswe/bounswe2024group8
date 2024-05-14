package com.example.fanaticbackend.repository;

import com.example.fanaticbackend.model.Comment;
import com.example.fanaticbackend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {


}
