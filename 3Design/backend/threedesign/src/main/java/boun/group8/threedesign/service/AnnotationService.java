package boun.group8.threedesign.service;

import boun.group8.threedesign.repository.AnnotationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnnotationService {

    final AnnotationRepository annotationRepository;
}
