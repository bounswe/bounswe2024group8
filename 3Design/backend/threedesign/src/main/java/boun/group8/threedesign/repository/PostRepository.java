package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(Long userId);

    List<Post> findByCategoryId(Long categoryId);

    List<Post> findByTagsContaining(String tag);

    Post getPostById(Long id);
}
