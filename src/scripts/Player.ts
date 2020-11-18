import Gameboard from './Gameboard';
import Battleship from './Battleship';

class Player {
  private board: Gameboard;
  private name: string;

  constructor(board: Gameboard, name: string) {
    this.board = board;
    this.name = name;
  }

  get getBoard(): Gameboard {
    return this.board;
  }

  get getName(): string {
    return this.name;
  }

  chooseAttack(board: Gameboard): number[] {
    const state = board.getBoardStates;
    let attacks: [number, number][] = [];

    if (state.shipHit.length > 0) {
      // if there are any ships that got hit
      // check if those ships are not yet sunk
      // if so, add all tiles around that ship that are not yet attacked to possible attacks
      const shipsDamaged = state.shipHit.filter((loc) => {
        if (!(<Battleship>board.getTiles[loc[0]][loc[1]]).isSunk()) {
          return true;
        }
        return false;
      });
      if (shipsDamaged.length > 0) {
        let offset: [number, number][] = [
          [-1, 0],
          [0, -1],
          [0, 1],
          [1, 0],
        ];
        shipsDamaged.forEach((pos) => {
          if (
            (<Battleship>board.getTiles[pos[0]][pos[1]]).getParts.filter(
              (part) => part,
            ).length > 1
          ) {
            offset = (<Battleship>board.getTiles[pos[0]][pos[1]]).getRotated
              ? [
                  [-1, 0],
                  [1, 0],
                ]
              : [
                  [0, -1],
                  [0, 1],
                ];
          }
          offset.forEach((off) => {
            if (
              pos[0] + off[0] < 0 ||
              pos[0] + off[0] > board.getSize - 1 ||
              pos[1] + off[1] < 0 ||
              pos[1] + off[1] > board.getSize - 1
            ) {
              return;
            }
            if (
              !state.shipHit.find(
                (el) => el[0] === pos[0] + off[0] && el[1] === pos[1] + off[1],
              ) &&
              !state.missed.find(
                (el) => el[0] === pos[0] + off[0] && el[1] === pos[1] + off[1],
              )
            ) {
              attacks.push([pos[0] + off[0], pos[1] + off[1]]);
            }
          });
        });
        if (attacks.length > 0) {
          return attacks[Math.floor(Math.random() * attacks.length)];
        }
      }
    }
    // else, just pick random not yet hit tile
    attacks = [...state.shipNotHit, ...state.notShot];
    return attacks[Math.floor(Math.random() * attacks.length)];
  }
}

export default Player;
