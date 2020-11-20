import React, { ReactElement, useState, useEffect } from 'react';
import Battleship from '../scripts/Battleship';
import Game from '../scripts/Game';
import '../styles/Board.scss';

function Board(props: {
  player: 0 | 1;
  game: Game;
  state: { [state: string]: [number, number][] };
  loop: (loc: [number, number]) => void;
  rotate: (loc: [number, number]) => void;
  move: (from: [number, number], to: [number, number]) => void;
  turn: 0 | 1;
}): ReactElement {
  const [active, setActive] = useState<string>('');
  const [marked, setMarked] = useState<[number, number] | null>(null);

  function updateTiles(): void {
    // adds classes to elements appropriate to their state
    const elements = document.querySelectorAll(
      `.board-tile[data-player="${props.player}"]`,
    );
    elements.forEach((el) => {
      // first clear all added classes
      el.classList.remove('ship-not-hit');
      el.classList.remove('ship-hit');
      el.classList.remove('ship-sunk');
      el.classList.remove('missed');
      el.classList.remove('marked');
    });

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

    if (marked) {
      const element = document.querySelector(
        `.board-tile[data-x="${marked[0]}"][data-y="${marked[1]}"][data-player="${props.player}"]`,
      );
      element?.classList.add('marked');
    }
  }

  function chooseAction(e: React.MouseEvent<HTMLDivElement>): void {
    const el = e.target as HTMLDivElement;
    const elX = parseInt(el.getAttribute('data-x') as string, 10);
    const elY = parseInt(el.getAttribute('data-y') as string, 10);
    if (props.player === 1 - props.turn) {
      props.loop([elX, elY]);
    } else if (props.player === 0) {
      console.log(marked);
      if (!marked) {
        if (
          typeof props.game.getPlayer(0).getBoard.getTiles[elX][elY] !==
          'boolean'
        ) {
          setMarked([elX, elY]);
        }
      } else if (marked) {
        if (marked[0] === elX && marked[1] === elY) {
          props.rotate([elX, elY]);
          setMarked(null);
        } else {
          props.move(marked, [elX, elY]);
          setMarked(null);
        }
      }
    }
  }

  useEffect(() => {
    if (props.turn === 1 - props.player) {
      setActive('active');
    } else {
      setActive('');
    }
    updateTiles();
  }, [props.turn]);

  useEffect(() => {
    updateTiles();
  });

  return (
    <table className={`board-wrapper ${active}`}>
      <tbody>
        {props.game.getPlayer(props.player).getBoard.getTiles.map((row, i) => {
          return (
            <tr key={i} className="board-row">
              {row.map((_, j) => {
                return (
                  <td key={j} className="board-element">
                    <div
                      key={`(${i}, ${j})`}
                      data-x={`${i}`}
                      data-y={`${j}`}
                      data-player={props.player}
                      className="board-tile"
                      onClick={chooseAction}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;
