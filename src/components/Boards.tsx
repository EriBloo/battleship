import React, { ReactElement, useEffect, useState } from 'react';
import Board from './Board';
import Game from '../scripts/Game';
import '../styles/Boards.scss';

function Boards(props: { game: Game; update: number }): ReactElement {
  const [turn, setTurn] = useState(props.game.getTurn);
  const [statePlayer, setStatePlayer] = useState(
    props.game.getPlayer(0).getBoard.getBoardStates,
  );
  const [stateComputer, setStateComputer] = useState(
    props.game.getPlayer(1).getBoard.getBoardStates,
  );
  const [block, setBlock] = useState(false);

  function timeout(min: number, max: number) {
    return new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * (max - min)) + min),
    );
  }

  function updateStatePlayer() {
    setStatePlayer(props.game.getPlayer(0).getBoard.getBoardStates);
  }

  function updateStateComputer() {
    setStateComputer(props.game.getPlayer(1).getBoard.getBoardStates);
  }

  function updateTurn() {
    setTurn(props.game.getTurn);
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
          props.game.next();
          updateTurn();
          await timeout(500, 2000);
          props.game.computerTurn();
          props.game.setWinner = props.game.isWinner();
          props.game.next();
          updateTurn();
          updateStatePlayer();
          setBlock(false);
        }
      } else {
        setBlock(false);
      }
    }
  }

  function rotateShip(loc: [number, number]): void {
    if (!props.game.getInit) {
      props.game.getPlayer(0).getBoard.rotateShip(loc);
      updateStatePlayer();
    }
  }

  function moveShip(from: [number, number], to: [number, number]): void {
    if (!props.game.getInit) {
      props.game.getPlayer(0).getBoard.moveShip(from, to);
      updateStatePlayer();
    }
  }

  useEffect(() => {
    updateStatePlayer();
    updateStateComputer();
  }, [props.update]);

  return (
    <div className="board-container">
      <Board
        player={0}
        game={props.game}
        state={statePlayer}
        loop={loop}
        rotate={rotateShip}
        move={moveShip}
        turn={turn}
      />
      <Board
        player={1}
        game={props.game}
        state={stateComputer}
        loop={loop}
        rotate={rotateShip}
        move={moveShip}
        turn={turn}
      />
    </div>
  );
}

export default Boards;
