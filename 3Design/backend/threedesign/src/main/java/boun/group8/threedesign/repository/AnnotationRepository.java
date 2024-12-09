package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.Annotation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnotationRepository extends JpaRepository<Annotation, Long> {

    List<Annotation> findAllByPostId(Long postId);

    List<Annotation> findAllByCommentId(Long commentId);

    int countByUserId(Long userId);


}
