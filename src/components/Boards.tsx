import React, { ReactElement, useEffect, useState } from 'react';
import Board from './Board';
import DisplayShips from './DisplayShips';
import Game from '../scripts/Game';
import '../styles/Boards.scss';
import Battleship from '../scripts/Battleship';

function Boards(props: { game: Game; update: number }): ReactElement {
  const [turn, setTurn] = useState(props.game.getTurn);
  const [statePlayer, setStatePlayer] = useState<{ [state: string]: [number, number][] }>(
    props.game.getPlayer(0).getBoard.getBoardStates,
  );
  const [stateComputer, setStateComputer] = useState<{ [state: string]: [number, number][] }>(
    props.game.getPlayer(1).getBoard.getBoardStates,
  );
  const [shipsPlayer, setShipsPlayer] = useState<Battleship[]>(props.game.getPlayer(0).getBoard.getShips);
  const [shipsComputer, setShipsComputer] = useState<Battleship[]>(props.game.getPlayer(1).getBoard.getShips);

  function updateStatePlayer(): void {
    setStatePlayer(props.game.getPlayer(0).getBoard.getBoardStates);
  }

  function updateStateComputer(): void {
    setStateComputer(props.game.getPlayer(1).getBoard.getBoardStates);
  }

  function updateShipsPlayer(): void {
    setShipsPlayer(props.game.getPlayer(0).getBoard.getShips);
  }

  function updateShipsComputer(): void {
    setShipsComputer(props.game.getPlayer(1).getBoard.getShips);
  }

  function updateTurn() {
    setTurn(props.game.getTurn);
  }

  async function loop(loc: [number, number]): Promise<void> {
    function timeout(min: number, max: number) {
      return new Promise((resolve) =>
        setTimeout(resolve, Math.floor(Math.random() * (max - min)) + min),
      );
    }

    if (props.game.getWinner === -1) {
      const success = props.game.playerTurn([loc[0], loc[1]]);
      if (success) {
        props.game.setWinner = props.game.isWinner();
        updateStateComputer();
        updateShipsComputer();
        if (props.game.getWinner === -1) {
          props.game.next();
          updateTurn();
          await timeout(500, 2000);
          props.game.computerTurn();
          props.game.setWinner = props.game.isWinner();
          props.game.next();
          updateTurn();
          updateStatePlayer();
          updateShipsPlayer();
        }
      }
    }
  }

  function rotateShip(loc: [number, number]): void {
    props.game.getPlayer(0).getBoard.rotateShip(loc);
    updateStatePlayer();
  }

  function moveShip(from: [number, number], to: [number, number]): void {
    props.game.getPlayer(0).getBoard.moveShip(from, to);
    updateStatePlayer();
  }

  useEffect(() => {
    updateStatePlayer();
    updateStateComputer();
  }, [props.update]);

  return (
    <div className="boards-container">
      <div className="board-container">
        <DisplayShips player='player' ships={shipsPlayer} />
        <Board
          player={0}
          game={props.game}
          state={statePlayer}
          loop={loop}
          rotate={rotateShip}
          move={moveShip}
          turn={turn}
        />
      </div>
      <div className="board-container">
        <Board
          player={1}
          game={props.game}
          state={stateComputer}
          loop={loop}
          rotate={rotateShip}
          move={moveShip}
          turn={turn}
        />
        <DisplayShips player='computer' ships={shipsComputer} />
      </div>
    </div>
  );
}

export default Boards;
