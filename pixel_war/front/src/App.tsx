import React from 'react';
import './App.css';
import { PixelWar } from './PixelWar';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-content">
        <h1>Massa Pixel War</h1>
        <PixelWar />
      </div>
    </div>
  );
};

export default App;