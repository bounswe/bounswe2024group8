package com.example.fanaticbackend.service;

import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import com.example.fanaticbackend.model.Community;
import com.example.fanaticbackend.model.User;
import com.example.fanaticbackend.model.enums.Team;
import com.example.fanaticbackend.repository.CommunityRepository;
import com.example.fanaticbackend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommunityService {

    final CommunityRepository communityRepository;

    final UserRepository userRepository;


    public Community findCommunityByTeamElseThrow(String team) {

        Community community = communityRepository.findCommunityByTeam(Team.valueOf(team.toUpperCase()));

        if (community == null) {
            throw new FanaticDatabaseException("Community not found");
        }

        return community;
    }


    //Use when creating user. User must be in a community
    public User joinCommunity(User user, String team) {

        if (user.getCommunity() != null) {
            throw new FanaticDatabaseException("You are already in a community");
        }

        Community community = findCommunityByTeamElseThrow(team);

        community.setFanaticCount(community.getFanaticCount() + 1);
        
        user.setCommunity(community);

        try {
            communityRepository.save(community);
        } catch (Exception e) {
            throw new FanaticDatabaseException("Error while updating community");
        }

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new FanaticDatabaseException("Error while joining community");
        }
    }

    public Boolean createAllCommunities() {

        List<Community> communities = new ArrayList<>();
        for (Team team : Team.values()) {
            if (team == Team.GLOBAL) {
                continue;
            }
            Community isExist = communityRepository.findCommunityByTeam(team);

            if (isExist != null) {
                continue;
            }

            Community community = Community.builder()
                    .team(team)
                    .name(team.name())
                    .description("Community of " + team.name())
                    .fanaticCount(0L)
                    .build();

            communities.add(community);
        }

        try {
            communityRepository.saveAll(communities);
        } catch (Exception e) {
            throw new FanaticDatabaseException("Error while creating communities");
        }

        return true;
    }



}
