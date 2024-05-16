package com.example.fanaticbackend.repository;

import com.example.fanaticbackend.model.Community;
import com.example.fanaticbackend.model.enums.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    Community findCommunityByTeam(Team team);

    Community findCommunityById(Long id);
}
