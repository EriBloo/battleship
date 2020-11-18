import React, { ReactElement, useState, useEffect } from 'react';
import Battleship from '../scripts/Battleship';
import Game from '../scripts/Game';
import '../styles/Board.scss';

function Board(props: {
  player: 0 | 1;
  game: Game;
  state: { [state: string]: [number, number][] };
  loop: (loc: [number, number]) => void;
}): ReactElement {
  const [currentTurn, setCurrentTurn] = useState(props.game.getTurn);
  const [active, setActive] = useState('');

  function updateTiles(): void {
    if (props.player === 0) {
      props.state.shipNotHit.map((ship) => {
        const element = document.querySelector(
          `.board-tile[data-x="${ship[0]}"][data-y="${ship[1]}"][data-player="${props.player}"]`,
        );
        element?.classList.add('ship-not-hit');
      });
    }
    props.state.shipHit.map((ship) => {
      const element = document.querySelector(
        `.board-tile[data-x="${ship[0]}"][data-y="${ship[1]}"][data-player="${props.player}"]`,
      );
      if (
        (props.game.getPlayer(props.player).getBoard.getTiles[ship[0]][
          ship[1]
        ] as Battleship).isSunk()
      ) {
        element?.classList.add('ship-sunk');
      } else {
        element?.classList.add('ship-hit');
      }
    });
    props.state.missed.map((ship) => {
      const element = document.querySelector(
        `.board-tile[data-x="${ship[0]}"][data-y="${ship[1]}"][data-player="${props.player}"]`,
      );
      element?.classList.add('missed');
    });
  }

  function loop(e: React.MouseEvent<HTMLDivElement>): void {
    if (props.player === 1 - currentTurn) {
      const el = e.target as HTMLDivElement;
      props.loop([parseInt(el.getAttribute('data-x') as string, 10), parseInt(el.getAttribute('data-y') as string, 10)]);
    }
  }

  useEffect(() => {
    if (currentTurn === 1 - props.player) {
      setActive('active');
    } else {
      setActive('');
    }
  }, [currentTurn]);

  useEffect(() => {
    updateTiles();
  }, [props.state]);

  return (
    <div className="board-wrapper">
      {props.game.getPlayer(props.player).getBoard.getTiles.map((row, i) => {
        return row.map((_, j) => {
          return (
            <div
              key={`(${i}, ${j})`}
              data-x={`${i}`}
              data-y={`${j}`}
              data-player={props.player}
              className={`board-tile ${active}`}
              onClick={loop}
            />
          );
        });
      })}
    </div>
  );
}

export default Board;
