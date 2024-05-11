package com.example.fanaticbackend.service;

import com.example.fanaticbackend.dto.WikidataTeamDto;
import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.Post;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.payload.PostCreateRequest;
import com.example.fanaticbackend.payload.SearchResponse;
import com.example.fanaticbackend.repository.PostRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
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

        WikidataTeamDto team = wikidataService.search(param);

        List<Post> posts = postRepository.findByTextLikeIgnoreCase(param);
        results.addAll(posts);

        SearchResponse result = new SearchResponse();
        result.setPosts(results);
        result.setTeam(team);

        return result;

    }

    public Post create(PostCreateRequest request) {

        User user = userService.getUserById(request.getUserId());

        Post post = Post.builder()
                .title(request.getTitle())
                .text(request.getText())
                .teamName(Team.valueOf(request.getTeamName()))
                .user(user)
                .likes(0)
                .dislikes(0)
                .comments(0)
                .build();

        try {
            postRepository.save(post);
        } catch (Exception e) {
            throw new FanaticDatabaseException("Post could not be saved");
        }

        return post;
    }

    public List<Post> getFeed() {

        return postRepository.findAllByOrderByIdDesc();
    }

    public void likePost(User user, Post post) {
        if (user.getDislikedPosts().contains(post)) {
            user.getDislikedPosts().remove(post);
            post.getDislikedByUsers().remove(user);
            post.setDislikes(post.getDislikes() - 1);
        }
        if (!user.getLikedPosts().contains(post)) {
            user.getLikedPosts().add(post);
            post.getLikedByUsers().add(user);
            post.setLikes(post.getLikes() + 1);
        }
        userService.saveUser(user);
        postRepository.save(post);
    }

    public void dislikePost(User user, Post post) {
        if (user.getLikedPosts().contains(post)) {
            user.getLikedPosts().remove(post);
            post.getLikedByUsers().remove(user);
            post.setLikes(post.getLikes() - 1);

        }
        if (!user.getDislikedPosts().contains(post)) {
            user.getDislikedPosts().add(post);
            post.getDislikedByUsers().add(user);
            post.setDislikes(post.getDislikes() + 1);
        }
        userService.saveUser(user);
        postRepository.save(post);
    }

    public void bookmarkPost(User user, Post post) {
        if (user.getBookmarkedPosts().contains(post)) {
            user.getBookmarkedPosts().remove(post);
            post.getBookmarkedByUsers().remove(user);
        } else {
            user.getBookmarkedPosts().add(post);
            post.getBookmarkedByUsers().add(user);
        }
        userService.saveUser(user);
        postRepository.save(post);
    }

    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new FanaticDatabaseException("Post not found with id: " + postId));
    }
}
