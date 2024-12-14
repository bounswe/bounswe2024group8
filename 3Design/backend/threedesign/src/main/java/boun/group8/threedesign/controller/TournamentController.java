package boun.group8.threedesign.controller;

import boun.group8.threedesign.model.Tournament;
import boun.group8.threedesign.model.TournamentEntry;
import boun.group8.threedesign.service.TournamentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tournaments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TournamentController {

    final TournamentService tournamentService;

    @Operation(summary = "Get current leaderboard", description = "Fetches the current leaderboard for the tournament of a specific category.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Leaderboard retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No leaderboard found for the specified category")
    })
    @GetMapping("/leaderboard/{categoryId}")
    public ResponseEntity<List<TournamentEntry>> getCurrentLeaderboardOfCategoryTournament(@PathVariable Long categoryId) {
        var leaderboard = tournamentService.getLeaderboardOfCurrentTournamentByCategoryId(categoryId);
        if (leaderboard == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(leaderboard);
    }

    @Operation(summary = "Get tournament by category ID", description = "Fetches the current tournament for a specific category.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tournament retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No tournament found for the specified category")
    })
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Tournament> getTournamentByCategoryId(@PathVariable Long categoryId) {
        var tournament = tournamentService.getCurrentTournamentByCategoryId(categoryId);
        if (tournament == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tournament);
    }

    @Operation(summary = "Manually start new tournaments", description = "Allows an admin to manually start new tournaments.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tournaments started successfully")
    })
    @PostMapping("/manual-start")
    public ResponseEntity<String> startNewTournaments() {
        tournamentService.startNewTournaments();
        return ResponseEntity.ok("Tournaments started");
    }
}

