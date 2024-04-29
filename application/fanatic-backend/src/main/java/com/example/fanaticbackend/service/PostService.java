package com.example.fanaticbackend.service;

import com.example.fanaticbackend.model.Post;
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

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getFeed() {
        return postRepository.findAllByOrderByIdDesc();
    }
}
