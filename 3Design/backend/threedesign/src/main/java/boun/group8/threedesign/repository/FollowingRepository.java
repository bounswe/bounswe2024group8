package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.Following;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowingRepository extends JpaRepository<Following, Long> {
    Following findByFollowerUserIdAndFollowedUserId(Long followerUserId, Long followedUserId);

    List<Following> findAllByFollowerUserId(Long followerUserId);

    List<Following> findAllByFollowedUserId(Long followedUserId);

    void deleteByFollowerUserIdAndFollowedUserId(Long followerUserId, Long followedUserId);

    int countByFollowedUserId(Long followedUserId);

}
