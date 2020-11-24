import React, { ReactElement, useState } from 'react';
import Boards from './Boards';
import Game from '../scripts/Game';
import 'normalize.css';
import '../styles/App.scss';

function App(): ReactElement {
  const ships: number[] = [5, 4, 3, 3, 2];
  const [game, setGame] = useState<Game>(new Game(ships, 10));
  const [display, setDisplay] = useState<string>('Move/Rotate ships');
  const [turn, setTurn] = useState<0 | 1>(game.getTurn);
  const [init, setInit] = useState<boolean>(game.getInit);

  function updateDisplay(): void {
    if (!game.getInit) {
      setDisplay('Move/Rotate ships');
    } else if (game.getWinner !== -1) {
      setDisplay(`${game.getPlayer(game.getWinner).getName} won!`);
    } else if (game.getInit) {
      setDisplay(`${game.getCurrentPlayer.getName} turn`);
    }
  }

  function updateTurn(): void {
    setTurn(game.getTurn);
    updateDisplay();
  }

  function updateInit(): void {
    setInit(game.getInit);
  }

  function initGame(): void {
    game.init();
    updateDisplay();
    updateInit();
  }

  return (
    <div className="app">
      <div className="display-wrapper">
        <div className="display">
          <h2>{display}</h2>
        </div>
      </div>
      <div className="buttons">
        <button type="button" onClick={initGame}>
          Start Game
        </button>
      </div>
      <Boards game={game} updateTurn={updateTurn} turn={turn} init={init} />
    </div>
  );
}

export default App;
