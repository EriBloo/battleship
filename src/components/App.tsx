import React, { ReactElement, useState, useEffect } from 'react';
import Boards from './Boards';
import Game from '../scripts/Game';
import 'normalize.css';
import '../styles/App.scss';

function App(): ReactElement {
  const ships: number[] = [5, 4, 3, 3, 2];
  const [game, setGame] = useState(new Game(ships));
  const [update, setUpdate] = useState(0);

  const initGame = () => {
    game.init();
  };

  useEffect(() => {
    game.getPlayer(0).getBoard.distributeShips(ships);
    setUpdate((prevState) => 1 - prevState);
  }, []);

  return (
    <div className="app">
      <button type="button" onClick={initGame}>
        StartGame
      </button>
      <Boards game={game} update={update} />
    </div>
  );
}

export default App;
