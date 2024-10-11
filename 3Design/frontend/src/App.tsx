import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Login/>
          }
        />
        <Route
          path="/home"
          element={
            <Home/>
          }
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
