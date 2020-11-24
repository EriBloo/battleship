import React, { ReactElement } from 'react';
import Battleship from '../scripts/Battleship';
import '../styles/DisplayShips.scss';

function DisplayShips(props: {
  player: string;
  ships: Battleship[];
}): ReactElement {
  return (
    <div className={`ships-container ${props.player}`}>
      {props.ships.sort((a, b) => a.getLength - b.getLength).map((ship, i) => {
        return (
          <div key={i} className="ship-wrapper">
            {ship.getParts.map((_, j) => {
              if (ship.isSunk()) {
                return <div key={j} className="part sunk" />;
              } else {
                return <div key={j} className="part" />;
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayShips;
