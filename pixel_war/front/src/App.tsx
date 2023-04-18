import React from 'react';
import './App.css';
import { PixelWar } from './MassaDappExample';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-content">
        <PixelWar />
      </div>
    </div>
  );
};

export default App;