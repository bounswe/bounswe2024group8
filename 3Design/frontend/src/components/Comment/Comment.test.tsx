import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DComment } from "../interfaces";
import Comment from './Comment';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);


describe('Comment Component', () => {
  const commentData: DComment = {
    commentId: 1,
    text: 'This is a text string',
    user: {
      id: 1,
      profilePictureUrl: '',
      nickName: 'TestUser',
      experience: 100,
    },
    likes: 10,
    dislikes: 2,
    reactionType: 'NONE',
  };

  afterEach(() => {
    mock.reset();
  });

  test('Bileşen doğru render ediliyor', () => {
    render(<Comment commentData={commentData} />);
    
    expect(screen.getByText('This is a text string')).toBeInTheDocument();
    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});