package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.Tournament;
import boun.group8.threedesign.model.TournamentEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.web.JsonPath;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentEntryRepository extends JpaRepository<TournamentEntry, Long> {

    TournamentEntry findByUserIdAndTournamentId(Long userId, Long tournamentId);

    TournamentEntry findByPostIdAndTournamentId(Long postId, Long tournamentId);

    List<TournamentEntry> findByTournamentOrderByScoreDesc(Tournament tournament);

    List<TournamentEntry> findTop3ByTournamentOrderByScoreDesc(Tournament tournament);

    boolean existsByPostId(Long postId);

    void deleteByPostId(Long postId);
}
