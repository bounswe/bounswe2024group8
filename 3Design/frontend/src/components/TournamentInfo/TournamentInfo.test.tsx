import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TournamentInfo from './TournamentInfo';
import { Tournament } from '../interfaces';

const mockTournament: Tournament = {
  endTime: new Date(Date.now() + 100000).toISOString(),
  isFinished: false,
  categoryId: 2,
  id: 2,
  startTime: new Date(Date.now() - 100000).toISOString(),
};

describe('TournamentInfo Component', () => {
  it('renders countdown when tournament is active', () => {
    render(<TournamentInfo info={mockTournament} showButton={1} />);

    expect(screen.getByText(/Time left:/)).toBeInTheDocument();
    expect(screen.queryByText(/Tournament Over/)).not.toBeInTheDocument();
  });

  it('shows "Tournament Over" when completed', () => {
    const pastTournament = { ...mockTournament, endTime: new Date(Date.now() - 100000).toISOString() };
    render(<TournamentInfo info={pastTournament} showButton={1} />);

    expect(screen.getByText(/Tournament Over/)).toBeInTheDocument();
  });

  it('renders button when showButton is 0', () => {
    render(<TournamentInfo info={mockTournament} showButton={0} />);

    const button = screen.getByRole('button', { name: /See Leaderboard/i });
    expect(button).toBeInTheDocument();
  });

  it('renders waiting message when no tournament info', () => {
    render(<TournamentInfo info={null} showButton={1} />);

    expect(screen.getByText(/Waiting for rewards/)).toBeInTheDocument();
  });
});
