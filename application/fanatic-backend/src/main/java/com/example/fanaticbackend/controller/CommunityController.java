package com.example.fanaticbackend.controller;

import com.example.fanaticbackend.service.CommunityService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/communities")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommunityController {

    final CommunityService communityService;

    @PostMapping("")
    public ResponseEntity<Boolean> createAll() {

        communityService.createAllCommunities();

        return ResponseEntity.ok(true);
    }
}
