package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Tournament;
import boun.group8.threedesign.model.TournamentEntry;
import boun.group8.threedesign.service.TournamentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tournaments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TournamentController {

    final TournamentService tournamentService;

    @GetMapping("/leaderboard/{categoryId}")
    public ResponseEntity<List<TournamentEntry>> getCurrentLeaderboardOfCategoryTournament(@PathVariable Long categoryId) {

        var leaderboard = tournamentService.getLeaderboardOfCurrentTournamentByCategoryId(categoryId);

        if (leaderboard == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(leaderboard);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Tournament> getTournamentByCategoryId(@PathVariable Long categoryId) {

        var tournament = tournamentService.getCurrentTournamentByCategoryId(categoryId);

        if (tournament == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(tournament);
    }
}
