package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.Following;
import boun.group8.threedesign.model.User;
import boun.group8.threedesign.repository.FollowingRepository;
import boun.group8.threedesign.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService {


    final UserRepository userRepository;

    final FollowingRepository followingRepository;

    final FileService fileService;

    public User getUserByEmail(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) throw new ThreeDesignDatabaseException("User not found with email: " + email);

        return user;
    }

    public User getUserById(Long id) {
        User user = userRepository.findUserById(id);

        if (user == null) {
            throw new ThreeDesignDatabaseException("User not found with id: " + id);
        }

        return user;
    }

    public Following followUser(Long followerUserId, Long followedUserId) {
        if (followerUserId.equals(followedUserId)) {
            throw new IllegalArgumentException("Users cannot follow themselves.");
        }

        var followedUser = userRepository.findUserById(followedUserId);

        if (followedUser == null) {
            throw new ThreeDesignDatabaseException("User not found with id: " + followedUserId);
        }

        Following existingFollow = followingRepository.findByFollowerUserIdAndFollowedUserId(followerUserId, followedUserId);

        if (existingFollow != null) {
            throw new IllegalStateException("You are already following this user.");
        }

        Following follow = new Following();
        follow.setFollowerUserId(followerUserId);
        follow.setFollowedUserId(followedUserId);
        return followingRepository.save(follow);
    }

    public void unfollowUser(Long followerUserId, Long followedUserId) {

        var followedUser = userRepository.findUserById(followedUserId);

        if (followedUser == null) {
            throw new ThreeDesignDatabaseException("User not found with id: " + followedUserId);
        }

        var following = followingRepository.findByFollowerUserIdAndFollowedUserId(followerUserId, followedUserId);

        if (following == null) {
            throw new IllegalStateException("You are not following this user.");
        }

        try {
            followingRepository.delete(following);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Error while deleting following");
        }

    }

    public List<Long> getFollowers(Long userId) {
        return followingRepository.findAllByFollowedUserId(userId).stream().map(Following::getFollowerUserId).toList();
    }

    public List<Long> getFollowing(Long userId) {
        return followingRepository.findAllByFollowerUserId(userId).stream().map(Following::getFollowedUserId).toList();
    }

    public void uploadProfilePicture(Long id, MultipartFile file) {

        User user = userRepository.findUserById(id);

        if (user == null) {
            throw new ThreeDesignDatabaseException("User not found with id: " + id);
        }

        String url;
        try {
            url = fileService.uploadFile(file, "profile-pictures");
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Error while uploading profile picture");
        }

        user.setProfilePictureUrl(url);

        try {
            userRepository.save(user);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Error while saving profile picture");
        }
    }


//    public Boolean updatePassword(User user, String newPassword){
//
//
//
//        user.setPassword(passwordEncoder.encode(newPassword));
//
//        try {
//            userRepository.save(user);
//        } catch (Exception e) {
//            throw new FanaticDatabaseException("Error while saving new password");
//        }
//
//        return true;
//
//    }


}
