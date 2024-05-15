package com.example.fanaticbackend.service;

import com.example.fanaticbackend.payload.ReactionRequest;
import com.example.fanaticbackend.repository.CommentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentService {

    CommentRepository commentRepository;

    public Boolean reactToComment(Long commentId, Long userId, ReactionRequest request) {
        return false;
    }


}
