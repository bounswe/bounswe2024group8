import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LeaderboardPage from './LeaderboardPage';


jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

const mockUseParams = useParams as jest.Mock;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('LeaderboardPage', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ category: '1' });
  });

  it('renders loading spinner initially', () => {
    render(<LeaderboardPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders leaderboard data when API calls succeed', async () => {
    mockAxios.get.mockImplementation((url) => {
      if (url.includes('tournaments/category/1')) {
        return Promise.resolve({
          data: {
            id: 1,
            startTime: '2024-11-01T00:00:00Z',
            endTime: '2024-12-01T00:00:00Z',
            categoryId: 1,
            isFinished: false,
          },
        });
      }
      if (url.includes('tournaments/leaderboard/1')) {
        return Promise.resolve({
          data: [
            {
              id: 1,
              user: { id: 1, nickName: 'Player1', profilePictureUrl: null, experience: 100 },
              postId: 101,
              score: 150,
              tournament: {
                id: 1,
                startTime: '2024-11-01T00:00:00Z',
                endTime: '2024-12-01T00:00:00Z',
                categoryId: 1,
                isFinished: false,
              },
              finishedPosition: 1,
            },
          ],
        });
      }
      return Promise.reject(new Error('Unknown API call'));
    });

    render(<LeaderboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Player1')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument(); 
    });
  });

  it('renders error message when API fails', async () => {
    mockAxios.get.mockRejectedValue(new Error('API error'));

    render(<LeaderboardPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/There are currently no tournaments for this category/i)
      ).toBeInTheDocument();
    });
  });
});
