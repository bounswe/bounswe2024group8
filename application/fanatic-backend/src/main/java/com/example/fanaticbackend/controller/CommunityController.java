package com.example.fanaticbackend.controller;

import com.example.fanaticbackend.model.Community;
import com.example.fanaticbackend.service.CommunityService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/communities")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommunityController {

    final CommunityService communityService;


    @GetMapping("{communityName}")
    public ResponseEntity<Community> getCommunityByName(
            @PathVariable String communityName
    ) {

        Community community = communityService.findCommunityByTeamElseThrow(communityName);

        return ResponseEntity.ok(community);
    }


    @PostMapping("")
    public ResponseEntity<Boolean> createAll() {

        communityService.createAllCommunities();

        return ResponseEntity.ok(true);
    }
}
