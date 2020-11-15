import Gameboard from './Gameboard';
import Battleship from './Battleship';

class Player {
  private board: Gameboard;
  private computer: boolean;

  constructor(board: Gameboard, computer: boolean) {
    this.board = board;
    this.computer = computer;
  }

  get isComputer(): boolean {
    return this.computer;
  }

  get getBoard(): Gameboard {
    return this.board;
  }

  chooseAttack(state: { [key: string]: [number, number][] }): number[] {
    let attacks: [number, number][] = [];

    if (state.shipHit.length > 0) {
      // if there are any ships that got hit
      // check if those ships are not yet sunk
      // if so, add all tiles around that ship that are not yet attacked to possible attacks
      const shipsDamaged = state.shipHit.filter((loc) => {
        if (!(<Battleship>this.board.getTiles[loc[0]][loc[1]]).isSunk()) {
          return true;
        }
        return false;
      });
      if (shipsDamaged.length > 0) {
        const offset = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];
        shipsDamaged.forEach((pos) => {
          offset.forEach((off) => {
            if (
              !state.shipHit.find(
                (el) => el[0] === pos[0] + off[0] && el[1] === pos[1] + off[1],
              ) &&
              !state.missed.find(
                (el) => el[0] === pos[0] + off[0] && el[1] === pos[1] + off[1],
            )) {
              attacks.push([pos[0] + off[0], pos[1] + off[1]]);
            }
          });
        });
        if (attacks.length > 0) {
          return attacks[Math.floor(Math.random() * this.board.getSize)];
        }
      }
    }
    // else, just pick random not yet hit tile
    attacks = [...state.shipNotHit, ...state.notShot];
    return attacks[Math.floor(Math.random() * attacks.length)];
  }
}

export default Player;
