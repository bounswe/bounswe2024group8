package boun.group8.threedesign.service;

import boun.group8.threedesign.model.Annotation;
import boun.group8.threedesign.repository.AnnotationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnnotationService {

    final AnnotationRepository annotationRepository;


    public List<Annotation> getAnnotationsByPostId(Long postId) {
        return annotationRepository.findAllByPostId(postId);
    }

    public List<Annotation> getAnnotationsByCommentId(Long commentId) {
        return annotationRepository.findAllByCommentId(commentId);
    }

}
