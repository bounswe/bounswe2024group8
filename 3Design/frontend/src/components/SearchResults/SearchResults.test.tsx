import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchResults from './SearchResults';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

const mockUseParams = useParams as jest.Mock;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('SearchResults', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ query: 'test-query' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeleton initially', () => {
    render(<SearchResults />);
    expect(screen.getByText(/Results for: test-query/i)).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument(); 
  });

  it('renders search results when API call succeeds', async () => {
    mockAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          isVisualPost: true,
          title: 'Gallery Post Example',
        },
        {
          id: 2,
          isVisualPost: false,
          title: 'Discussion Post Example',
        },
      ],
    });

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText('Gallery Post Example')).toBeInTheDocument();
      expect(screen.getByText('Discussion Post Example')).toBeInTheDocument();
    });
  });

  it('renders "No results" when API call returns an empty array', async () => {
    mockAxios.get.mockResolvedValue({ data: [] });

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText('No results for this query')).toBeInTheDocument();
    });
  });

  it('handles API call failure gracefully', async () => {
    mockAxios.get.mockRejectedValue(new Error('API error'));

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText('No results for this query')).toBeInTheDocument();
    });
  });
});
