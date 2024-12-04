package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findUserById(Long id);

    List<User> findByNickNameContainingIgnoreCase(String param);

}
