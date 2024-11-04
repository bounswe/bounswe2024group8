package boun.group8.threedesign.repository;

import boun.group8.threedesign.model.TournamentEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.web.JsonPath;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentEntryRepository extends JpaRepository<TournamentEntry, Long> {
}
