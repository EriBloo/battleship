import React, { ReactElement, useState, useEffect } from 'react';
import Battleship from '../scripts/Battleship';
import Game from '../scripts/Game';
import Gameboard from '../scripts/Gameboard';
import '../styles/Board.scss';

function Board(props: {
  player: 0 | 1;
  game: Game;
  state: { [state: string]: [number, number][] };
  loop: (loc: [number, number]) => void;
  rotate: (loc: [number, number]) => void;
  move: (from: [number, number], to: [number, number]) => void;
  turn: 0 | 1;
  init: boolean;
}): ReactElement {
  const [active, setActive] = useState<string>('');
  const [marked, setMarked] = useState<Battleship | null>(null);

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
      el.classList.remove('marked-origin');
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

    if (marked && !props.game.getInit) {
      const origin = marked.getOrigin;
      const offset: [number, number][] = Array.from(
        { length: marked.getLength - 1 },
        (_, k) => (marked.getRotated ? [k + 1, 0] : [0, k + 1]),
      );

      const originElement = document.querySelector(
        `.board-tile[data-x="${origin[0]}"][data-y="${origin[1]}"][data-player="${props.player}"]`,
      );
      originElement?.classList.add('marked-origin');

      offset.map((off) => {
        const element = document.querySelector(
          `.board-tile[data-x="${origin[0] - off[0]}"][data-y="${
            origin[1] - off[1]
          }"][data-player="${props.player}"]`,
        );
        element?.classList.add('marked');
      });
    }
  }

  function chooseAction(e: React.MouseEvent<HTMLDivElement>): void {
    const el = e.target as HTMLDivElement;
    const elX = parseInt(el.getAttribute('data-x') as string, 10);
    const elY = parseInt(el.getAttribute('data-y') as string, 10);

    if (
      props.player === 1 - props.turn &&
      props.player === 1 &&
      props.game.getInit
    ) {
      props.loop([elX, elY]);
    } else if (props.player === 0 && !props.game.getInit) {
      if (!marked) {
        const tile = props.game.getPlayer(0).getBoard.getTiles[elX][elY];
        if (typeof tile !== 'boolean') {
          setMarked(tile);
        }
      } else if (marked) {
        const origin = marked.getOrigin;
        if (origin[0] === elX && origin[1] === elY) {
          props.rotate([elX, elY]);
          removeValid();
          setMarked(null);
        } else {
          props.move([origin[0], origin[1]], [elX, elY]);
          removeValid();
          setMarked(null);
        }
      }
    }
  }

  function showValid(e: React.MouseEvent<HTMLDivElement>): void {
    // marks valid tiles for moving or rotating ship
    if (marked) {
      const el = e.target as HTMLDivElement;
      const elX = parseInt(el.getAttribute('data-x') as string, 10);
      const elY = parseInt(el.getAttribute('data-y') as string, 10);
      const origin = marked.getOrigin;

      // offset is different if we mouse over origin tile or not
      let offset: [number, number][];
      if (elX === origin[0] && elY === origin[1]) {
        offset = Array.from({ length: marked.getLength }, (_, k) =>
          marked.getRotated ? [0, k] : [k, 0],
        );
      } else {
        offset = Array.from({ length: marked.getLength }, (_, k) =>
          marked.getRotated ? [k, 0] : [0, k],
        );
      }

      // get valid tiles, but include tiles in place of marked ship
      const boardCopy = new Gameboard(props.game.getPlayer(0).getBoard.getSize);
      const ships = props.game.getPlayer(0).getBoard.getShips;
      ships.map((ship) => {
        if (
          ship.getOrigin[0] !== origin[0] ||
          ship.getOrigin[1] !== origin[1]
        ) {
          boardCopy.placeShip(ship.getLength, ship.getOrigin, ship.getRotated);
        }
      });
      const valid = boardCopy.getValidTiles;

      // mark tiles
      if (
        offset.every((off) =>
          valid.find(
            (val) => elX - off[0] === val[0] && elY - off[1] === val[1],
          ),
        )
      ) {
        const originElement = document.querySelector(
          `.board-tile[data-x="${elX}"][data-y="${elY}"][data-player="${0}"]`,
        );
        originElement?.classList.add('valid-origin');

        offset.map((off) => {
          if (off[0] !== 0 || off[1] !== 0) {
            const element = document.querySelector(
              `.board-tile[data-x="${elX - off[0]}"][data-y="${
                elY - off[1]
              }"][data-player="${0}"]`,
            );
            element?.classList.add('valid');
          }
        });
      }
    }
  }

  function removeValid() {
    const elements = document.querySelectorAll(
      `.board-tile[data-player="${0}"]`,
    );
    elements.forEach((el) => {
      el.classList.remove('valid-origin');
      el.classList.remove('valid');
    });
  }

  useEffect(() => {
    if (!props.game.getInit) {
      setActive('active');
    } else if (props.turn === 1 - props.player) {
      setActive('active');
    } else {
      setActive('');
    }
    updateTiles();
  }, [props.turn, props.init]);

  useEffect(() => {
    updateTiles();
  });

  return (
    <div className="board">
      <table className={`board-wrapper ${active}`}>
        <tbody>
          {props.game
            .getPlayer(props.player)
            .getBoard.getTiles.map((row, i) => {
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
                          onMouseMove={showValid}
                          onMouseLeave={removeValid}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <h4>{`${props.game.getPlayer(props.player).getName} board`}</h4>
    </div>
  );
}

export default Board;
