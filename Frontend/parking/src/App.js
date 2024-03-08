// src/App.js
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
const App = () => {
  return (
      <div className="App">
        <Login/>
        <Signup/>
      </div>
  );
};
export default App;
