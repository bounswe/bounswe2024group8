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
    final PostRepository PostRepository;

    public ArrayList<Post> searchPost(String param) {
        ArrayList<Post> results = new ArrayList<>();
        var post = Post.builder().text(wikidataService.search(param))
                .title("Wikidata Results")
                .build();
        results.add(post);

        List<Post> posts = PostRepository.findByTextLikeIgnoreCase(param);
        results.addAll(posts);

        return results;

    }
}
