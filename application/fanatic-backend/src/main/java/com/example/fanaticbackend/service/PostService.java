package com.example.fanaticbackend.service;

import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.PostCreateRequest;
import com.example.fanaticbackend.repository.PostRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostService {

    final WikidataService wikidataService;
    final PostRepository postRepository;
    final UserService userService;

    public List<Post> searchPost(String param) {
        List<Post> results = new ArrayList<>();
        var post = Post.builder().text(wikidataService.search(param))
                .title("Wikidata Results")
                .build();
        results.add(post);

        List<Post> posts = postRepository.findByTextLikeIgnoreCase(param);
        results.addAll(posts);

        return results;

    }

    public Post create(PostCreateRequest request) {
        Post post = Post.builder()
                .title(request.getTitle())
                .text(request.getText())
                .teamName(Team.valueOf(request.getTeamName()))
                .user(userService.getUserById(request.getUserId()))
                .build();
        return postRepository.save(post);
    }

    public List<Post> getFeed() {
        return postRepository.findAllByOrderByIdDesc();
    }
}
