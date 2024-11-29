package boun.group8.threedesign.service;

import boun.group8.threedesign.exception.custom.ThreeDesignDatabaseException;
import boun.group8.threedesign.model.*;
import boun.group8.threedesign.repository.TournamentEntryRepository;
import boun.group8.threedesign.repository.TournamentRepository;
import boun.group8.threedesign.repository.UserRepository;
import com.google.type.DateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TournamentServiceTest {

    @InjectMocks
    private TournamentService tournamentService;

    @Mock
    private TournamentRepository tournamentRepository;

    @Mock
    private TournamentEntryRepository tournamentEntryRepository;

    @Mock
    private CategoryService categoryService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        Tournament tournament = new Tournament();
        tournament.setId(1L);
        tournament.setIsFinished(false);
        tournament.setCategoryId(1L);
        when(tournamentRepository.findByIsFinishedFalse()).thenReturn(List.of(tournament));
        tournamentService = new TournamentService(
                tournamentRepository,
                tournamentEntryRepository,
                categoryService,
                userRepository
        );
    }
    @Test
    public void startNewTournaments_ThrowsException_WhenActiveTournamentsExist() {
        // Arrange
        when(tournamentRepository.findByIsFinishedFalse())
                .thenReturn(List.of(new Tournament()));

        // Act & Assert
        assertThatThrownBy(() -> tournamentService.startNewTournaments())
                .isInstanceOf(ThreeDesignDatabaseException.class)
                .hasMessageContaining("There are already active tournaments");
    }

    @Test
    public void startNewTournaments_SavesNewTournaments_WhenNoActiveTournaments() {
        // Arrange
        when(tournamentRepository.findByIsFinishedFalse()).thenReturn(new ArrayList<>());
        when(categoryService.getCategories()).thenReturn(
                List.of(new Category(1L, "Category 1", "desc", 15))
        );

        // Act
        tournamentService.startNewTournaments();

        // Assert
        verify(tournamentRepository, times(1)).saveAll(anyList());
    }


    @Test
    public void endTournaments_SetsTournamentsAsFinished_WhenActiveTournamentsExist() {
        // Arrange
        List<Tournament> activeTournaments = List.of(new Tournament());
        when(tournamentRepository.findByIsFinishedFalse()).thenReturn(new ArrayList<>());
        when(tournamentEntryRepository.findTop3ByTournamentOrderByScoreDesc(any())).thenReturn(new ArrayList<>());

        // Act
        tournamentService.endTournaments();

        // Assert
        verify(tournamentRepository, times(1)).saveAll(any());
    }

    @Test
    public void enterTournament_ThrowsException_WhenNoActiveTournamentForCategory() {
        // Arrange
        User user = new User();
        Post post = new Post();
        post.setCategoryId(2L);
//        when(tournamentRepository.findByIsFinishedFalse()).thenReturn(new ArrayList<>());

        // Act & Assert
        assertThatThrownBy(() -> tournamentService.enterTournament(user, post))
                .isInstanceOf(ThreeDesignDatabaseException.class)
                .hasMessageContaining("No active tournament for categoryId");
    }

    @Test
    public void enterTournament_SavesTournamentEntry_WhenValidRequest() {
        // Arrange
        User user = new User();
        user.setId(1L);
        Post post = new Post();
        post.setCategoryId(1L);

        when(tournamentEntryRepository.findByUserIdAndTournamentId(user.getId(), 1L)).thenReturn(null);

        // Act
        tournamentService.enterTournament(user, post);

        // Assert
        verify(tournamentEntryRepository, times(1)).save(any(TournamentEntry.class));
    }

    @Test
    public void updatePostScoreIfPossible_UpdatesScore_WhenEntryExists() {
        // Arrange
        Post post = new Post();
        post.setId(1L);
        post.setCategoryId(1L);
        TournamentEntry entry = new TournamentEntry();
        entry.setScore(10);
        when(tournamentEntryRepository.findByPostIdAndTournamentId(post.getId(), 1L)).thenReturn(entry);

        // Act
        tournamentService.updatePostScoreIfPossible(post, 5);

        // Assert
        assertEquals(15, entry.getScore());
        verify(tournamentEntryRepository, times(1)).save(entry);
    }

    @Test
    public void assignPrizes_AssignsPrizesToTopEntries() {
        // Arrange
        TournamentEntry firstEntry = new TournamentEntry();
        firstEntry.setUser(User.builder().id(1L).experience(10L).build());
        firstEntry.setScore(100);
        TournamentEntry secondEntry = new TournamentEntry();
        secondEntry.setUser(User.builder().id(2L).experience(10L).build());
        secondEntry.setScore(80);
        TournamentEntry thirdEntry = new TournamentEntry();
        thirdEntry.setUser(User.builder().id(3L).experience(10L).build());
        thirdEntry.setScore(60);

        when(tournamentEntryRepository.findTop3ByTournamentOrderByScoreDesc(any()))
                .thenReturn(List.of(firstEntry, secondEntry, thirdEntry));

        // Act
        tournamentService.assignPrizes();

        // Assert
        assertEquals(40, firstEntry.getUser().getExperience());
        assertEquals(30, secondEntry.getUser().getExperience());
        assertEquals(20, thirdEntry.getUser().getExperience());
        verify(userRepository, times(1)).saveAll(anyList());
    }
}
