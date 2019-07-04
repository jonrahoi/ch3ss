import React from 'react';
import logo from './logo.svg';
import Counter from './Counter'
import './App.css';
import * as THREE from 'three';

const App: React.FC = () => {

  return (
    <div className="App">
      <Counter></Counter>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button>
          startGame
        </button>
      </header>

    </div>
  );
}

export default App;
