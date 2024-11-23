import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import PostPage from './components/PostPage/PostPage';
import SearchResults from './components/SearchResults/SearchResults';
import LeaderboardPage from './components/TournamentLeaderboard/LeaderboardPage';
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <LoginPage/>
          }
        />
        <Route
          path="/home"
          element={
            <HomePage/>
          }
        />
        <Route
          path="/home/:id"
          element={
            <HomePage/>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PostPage/>
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage/>
          }
        />
        <Route
          path="/search/:query"
          element={
            <SearchResults/>
          }
        />
        <Route
          path="/search"
          element={
            <SearchResults/>
          }
        />
        <Route
<<<<<<< HEAD
          path="/tournament/:category"
          element={
            <LeaderboardPage/>
=======
          path="/profile/:id"
          element={
            <ProfilePage/>
>>>>>>> 784fcb7 (profile page merge)
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
