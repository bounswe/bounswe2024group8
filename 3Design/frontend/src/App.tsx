import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
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
          path="/register"
          element={
            <RegisterPage/>
          }
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
