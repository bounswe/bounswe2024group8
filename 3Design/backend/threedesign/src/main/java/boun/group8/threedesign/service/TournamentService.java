package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.*;
import boun.group8.threedesign.model.enums.ReactionType;
import boun.group8.threedesign.repository.TournamentEntryRepository;
import boun.group8.threedesign.repository.TournamentRepository;
import boun.group8.threedesign.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TournamentService {

    final TournamentRepository tournamentRepository;

    final TournamentEntryRepository tournamentEntryRepository;

    final CategoryService categoryService;

    final UserRepository userRepository;
    List<Tournament> tournaments;

    public TournamentService(
            final TournamentRepository tournamentRepository,
            final TournamentEntryRepository tournamentEntryRepository,
            final CategoryService categoryService,
            final UserRepository userRepository) {
        this.tournamentRepository = tournamentRepository;
        this.tournamentEntryRepository = tournamentEntryRepository;
        this.categoryService = categoryService;
        this.userRepository = userRepository;

        setTournaments();
    }

    private void setTournaments() {
        tournaments = tournamentRepository.findByIsFinishedFalse();
    }
    @Scheduled(cron = "0 0 0 * * MON", zone = "UTC") // At 00:00 UTC every week monday
//    @Scheduled(cron = "0 41 19 * * SAT", zone = "UTC") // testing
    @Transactional(rollbackFor = Exception.class)
    @Retryable(retryFor = ThreeDesignDatabaseException.class, maxAttempts = 3, backoff = @Backoff(delay = 10000))
    public void startNewTournaments() {
        System.out.println("Starting new tournaments");

        List<Tournament> tournaments = tournamentRepository.findByIsFinishedFalse();

        if (!tournaments.isEmpty()) {
            throw new ThreeDesignDatabaseException("There are already active tournaments");
        }

        var now = LocalDateTime.now(ZoneOffset.UTC);

        List<Tournament> newTournaments = new ArrayList<>();

        categoryService.getCategories().forEach(category -> {
            Tournament tournament = new Tournament();
            tournament.setCategoryId(category.getId());
            tournament.setStartTime(now);
            tournament.setEndTime(now.plusDays(7));
            tournament.setIsFinished(false);
            newTournaments.add(tournament);
        });

        try {
            tournamentRepository.saveAll(newTournaments);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Failed to start new tournaments");
        }

        setTournaments();
    }

    @Scheduled(cron = "0 55 23 * * SUN", zone = "UTC") // At 23:55 UTC every week sunday
//    @Scheduled(cron = "0 48 19 * * SAT", zone = "UTC") // testing
    @Transactional(rollbackFor = Exception.class)
    @Retryable(retryFor = ThreeDesignDatabaseException.class, maxAttempts = 3, backoff = @Backoff(delay = 10000))
    public void endTournaments() {
        System.out.println("Ending current tournaments");

        List<Tournament> tournaments = this.tournaments;

        if (tournaments.isEmpty()) {
            throw new ThreeDesignDatabaseException("There are no active tournaments");
        }

        tournaments.forEach(tournament -> {
            tournament.setIsFinished(true);
        });

        try {
            tournamentRepository.saveAll(tournaments);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Failed to end tournaments");
        }

        //TODO: Calculate points and assign prizes.

        assignPrizes();

        setTournaments();
    }

    public Tournament getCurrentTournamentByCategoryId(Long categoryId){
        Tournament tournament = tournaments.stream().filter(t -> t.getCategoryId().equals(categoryId) && !t.getIsFinished()).findFirst().orElse(null);

        return tournament;
    }


    @Transactional
    public void enterTournament(User user, Post post) {
        var categoryId = post.getCategoryId();

        Tournament currentTournament = getCurrentTournamentByCategoryId(categoryId);

        if (currentTournament == null) {
            throw new ThreeDesignDatabaseException("No active tournament for categoryId: " + categoryId);
        }

        var entry = tournamentEntryRepository.findByUserIdAndTournamentId(user.getId(), currentTournament.getId());

        if (entry != null) {
            throw new ThreeDesignDatabaseException("User already entered the tournament for categoryId: " + categoryId);
        }

        var tournamentEntry = new TournamentEntry();
        tournamentEntry.setTournament(currentTournament);
        tournamentEntry.setUser(user);
        tournamentEntry.setPostId(post.getId());
        tournamentEntry.setScore(0);
        tournamentEntry.setFinishedPosition(0);

        try {
            tournamentEntryRepository.save(tournamentEntry);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Failed to enter the tournament", e);
        }
    }

    //Should call this method whenever there is a possible interaction with any post.
    @Transactional
    public void updatePostScoreIfPossible(Post post, int additionalScore){
        var categoryId = post.getCategoryId();
        var currentTournament = getCurrentTournamentByCategoryId(categoryId);

        if (currentTournament == null) {
            return;
        }

        var entry = tournamentEntryRepository.findByPostIdAndTournamentId(post.getId(), currentTournament.getId());

        if (entry == null) {
            return;
        }

        entry.setScore(entry.getScore() + additionalScore);

        try {
            tournamentEntryRepository.save(entry);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Failed to update tournament score", e);
        }
    }

    public List<TournamentEntry> getLeaderboardOfCurrentTournamentByCategoryId(Long categoryId){

        var currentTournament = getCurrentTournamentByCategoryId(categoryId);

        if (currentTournament == null) {
            throw new ThreeDesignDatabaseException("No active tournament for categoryId: " + categoryId);
        }

        return tournamentEntryRepository.findByTournamentOrderByScoreDesc(currentTournament);
    }

    public int calculateReactionScore(ReactionType reactionType, boolean bookmark){
        int reactionScore = 0;

        if(reactionType == ReactionType.LIKE){
            reactionScore = 1;
        } else if(reactionType == ReactionType.DISLIKE){
            reactionScore = -1;
        }

        if (bookmark)
            reactionScore += 2;

        return reactionScore;
    }

    public boolean isPostInTournament(Long postId) {
        return tournamentEntryRepository.existsByPostId(postId);
    }

    @Transactional
    public void assignPrizes() {

        if (tournaments.isEmpty()) return;

        List<User> toBeUpdatedUsers = new ArrayList<>();
        List<TournamentEntry> toBeUpdatedEntries = new ArrayList<>();

        for (Tournament tournament : tournaments) {
            List<TournamentEntry> topEntries = tournamentEntryRepository.findTop3ByTournamentOrderByScoreDesc(tournament);

            if (!topEntries.isEmpty()) {
                // Award prizes to the top 3 competitors
                int[] prizeAmounts = {30, 20, 10}; // User scores
                for (int i = 0; i < topEntries.size(); i++) {
                    //TODO: Update user score.
                    User user = topEntries.get(i).getUser();
                    user.setExperience(user.getExperience() + prizeAmounts[i]);
                    toBeUpdatedUsers.add(user);
                    TournamentEntry entry = topEntries.get(i);
                    entry.setFinishedPosition(i + 1);
                    toBeUpdatedEntries.add(entry);
                }
            }
        }

        try {
            userRepository.saveAll(toBeUpdatedUsers);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Failed to assign prizes", e);
        }

        try {
            tournamentEntryRepository.saveAll(toBeUpdatedEntries);
        } catch (Exception e) {
            throw new ThreeDesignDatabaseException("Failed to assign prizes", e);
        }
    }
}
