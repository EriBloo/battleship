import Battleship from './Battleship';

class Gameboard {
  private size: number;
  private tiles: (boolean | Battleship)[][];
  private ships: Battleship[];

  constructor(size: number) {
    this.size = size;
    this.tiles = Array.from({ length: size }, () =>
      new Array(size).fill(false),
    );
    this.ships = [];
  }

  get getTiles(): (boolean | Battleship)[][] {
    return this.tiles;
  }

  get getSize(): number {
    return this.size;
  }

  get getShips(): Battleship[] {
    return this.ships;
  }

  get getBoardStates(): { [state: string]: [number, number][] } {
    // assign every coordinates to state it's in: ship hit, ship not hit, not shot (and no ship), missed (and no ship)
    const states: { [state: string]: [number, number][] } = {
      shipHit: [],
      shipNotHit: [],
      missed: [],
      notShot: [],
    };

    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        const tile = this.tiles[i][j];
        if (typeof tile === 'boolean') {
          if (tile === false) {
            states.notShot.push([i, j]);
          } else {
            states.missed.push([i, j]);
          }
        } else {
          const shipParts = tile.getParts;
          const shipOrigin = tile.getOrigin;
          const partToHit = shipOrigin[0] - i + (shipOrigin[1] - j);
          if (shipParts[partToHit] === false) {
            states.shipNotHit.push([i, j]);
          } else {
            states.shipHit.push([i, j]);
          }
        }
      }
    }

    return states;
  }

  placeShip(
    shipLength: number,
    location: [number, number],
    rotated: boolean = false,
  ): void {
    const validPlacement = this.getBoardStates.notShot;
    const battleship = new Battleship(shipLength, [location[0], location[1]]);
    const placementOffset: number[][] = Array.from(
      { length: shipLength },
      (_, k) => (rotated ? [k, 0] : [0, k]),
    );
    const contactOffset: number[][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    placementOffset.forEach((placement) => {
      // checks if ship placement is valid
      if (
        !validPlacement.some(
          (tile) =>
            tile[0] === location[0] - placement[0] &&
            tile[1] === location[1] - placement[1],
        )
      ) {
        throw new Error('Invalid location.');
      }
      contactOffset.forEach((contact) => {
        // checks tiles around ship, so no touching ship placing is possible
        if (
          location[0] - placement[0] + contact[0] < 0 ||
          location[0] - placement[0] + contact[0] > this.size - 1 ||
          location[1] - placement[1] + contact[1] < 0 ||
          location[1] - placement[1] + contact[1] > this.size - 1
        ) {
          return;
        }
        if (
          this.tiles[location[0] - placement[0] + contact[0]][
            location[1] - placement[1] + contact[1]
          ] !== false
        ) {
          throw new Error('Invalid location.');
        }
      });
    });

    placementOffset.forEach((placement) => {
      // if everything is correct places ship
      this.tiles[location[0] - placement[0]][
        location[1] - placement[1]
      ] = battleship;
      this.ships.push(battleship);
    });
  }

  receiveAttack(location: [number, number]): boolean {
    const state = this.getBoardStates;
    const validAttacks = [...state.shipNotHit, ...state.notShot];
    if (
      !validAttacks.some(
        (attack) => attack[0] === location[0] && attack[1] === location[1],
      )
    ) {
      return false;
    }
    if (
      state.notShot.find((el) => el[0] === location[0] && el[1] === location[1])
    ) {
      this.tiles[location[0]][location[1]] = true;
      return true;
    }
    if (
      state.shipNotHit.find(
        (el) => el[0] === location[0] && el[1] === location[1],
      )
    ) {
      const tile = this.tiles[location[0]][location[1]];
      (<Battleship>tile).hit(
        (<Battleship>tile).getOrigin[0] -
          location[0] +
          ((<Battleship>tile).getOrigin[1] - location[1]),
      );
      return true;
    }
    return false;
  }

  allSunk(): boolean {
    return this.ships.every((ship) => ship.isSunk());
  }

  distributeShips(ships: number[]):boolean {
    let done: boolean[] = [];
    ships
      .sort((a, b) => b - a)
      .forEach((len) => {
        let success: boolean = false;
        let tried: [[number, number], boolean][] = [];
        let location: [number, number];
        let rotated: boolean;
        do {
          try {
            do {
              location = [
                Math.floor(Math.random() * this.size),
                Math.floor(Math.random() * this.size),
              ];
              rotated = Math.random() < 0.5 ? true : false;
            } while (
              tried.find(
                (el) =>
                  el[0][0] === location[0] &&
                  el[0][1] === location[1] &&
                  el[1] === rotated,
              )
            );
            this.placeShip(len, location, rotated);
            success = true;
          } catch {
            tried.push([location, rotated]);
            success = false;
          }
        } while (!success && tried.length < (this.size * this.size));
        done.push(success);
      });
      return done.every((d) => d);
  }
}

export default Gameboard;
