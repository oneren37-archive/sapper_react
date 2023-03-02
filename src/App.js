import React from 'react';
import Header from './components/header/Header';
import Board from './components/board/Board';

import './App.scss';

function App() {
  return (
    <div className="App">
      <main className="App-content">
        <Header />
        <Board />
      </main>
    </div>
  );
}

export default App;
