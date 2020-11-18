import React, { ReactElement, useState } from 'react';
import Board from './Board';
import Game from '../scripts/Game';
import '../styles/Boards.scss';

function Boards(props: { game: Game }): ReactElement {
  const [statePlayer, setStatePlayer] = useState(
    props.game.getPlayer(0).getBoard.getBoardStates,
  );
  const [stateComputer, setStateComputer] = useState(
    props.game.getPlayer(1).getBoard.getBoardStates,
  );
  const [block, setBlock] = useState(false);

  function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function updateStatePlayer() {
    setStatePlayer(props.game.getPlayer(0).getBoard.getBoardStates);
  }

  function updateStateComputer() {
    setStateComputer(props.game.getPlayer(1).getBoard.getBoardStates);
  }

  async function loop(loc: [number, number]): Promise<void> {
    if (props.game.getInit && props.game.getWinner === -1) {
      if (block) return;
      setBlock(true);
      const success = props.game.playerTurn([loc[0], loc[1]]);
      if (success) {
        props.game.setWinner = props.game.isWinner();
        updateStateComputer();
        if (props.game.getWinner === -1) {
          await timeout(1000);
          props.game.next();
          props.game.computerTurn();
          props.game.setWinner = props.game.isWinner();
          props.game.next();
          updateStatePlayer();
          setBlock(false)
        }
      }
    }
  }

  return (
    <div className="board-container">
      <Board player={0} game={props.game} state={statePlayer} loop={loop} />
      <Board player={1} game={props.game} state={stateComputer} loop={loop} />
    </div>
  );
}

export default Boards;
