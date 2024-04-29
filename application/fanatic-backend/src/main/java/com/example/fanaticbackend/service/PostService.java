package com.example.fanaticbackend.service;

import com.example.fanaticbackend.dto.WikidataTeamDto;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.PostCreateRequest;
import com.example.fanaticbackend.payload.SearchResponse;
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

    public SearchResponse searchPost(String param) {
        List<Post> results = new ArrayList<>();
//        var post = Post.builder().text(wikidataService.search(param))
//                .title("Wikidata Results")
//                .build();
//        results.add(post);
        //TODO: @oguz WikidataService should return type: WikidataTeamDto

        WikidataTeamDto team = new WikidataTeamDto();

        List<Post> posts = postRepository.findByTextLikeIgnoreCase(param);
        results.addAll(posts);

        SearchResponse result = new SearchResponse();
        result.setPosts(results);
        result.setTeam(team);

        return result;

    }

    public Post create(PostCreateRequest request) {
        Post post = Post.builder()
                .title(request.getTitle())
                .text(request.getText())
                .teamName(Team.valueOf(request.getTeamName()))
                .user(userService.getUserById(request.getUserId()))
                .likes(0)
                .dislikes(0)
                .comments(0)
                .build();
        return postRepository.save(post);
    }

    public List<Post> getFeed() {
        return postRepository.findAllByOrderByIdDesc();
    }
}
