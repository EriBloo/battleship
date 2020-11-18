import React, { ReactElement, useState, useEffect } from 'react';
import Boards from './Boards';
import Game from '../scripts/Game';
import 'normalize.css';
import '../styles/App.scss';

function App(): ReactElement {
  const [game, setGame] = useState(new Game([2, 3, 3, 4, 5]));

  const initGame = () => {
    game.init();
  };

  useEffect(() => {
    game.getPlayer(0).getBoard.distributeShips([2, 3, 3, 4, 5])
  }, []);

  return (
    <div className="app">
      <button type="button" onClick={initGame}>StartGame</button>
      <Boards game={game} />
    </div>
  );
}

export default App;
