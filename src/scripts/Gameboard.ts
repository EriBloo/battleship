import Battleship from './Battleship';

class Gameboard {
  private size: number;
  private tiles: (boolean | Battleship)[][];

  constructor(size: number) {
    this.size = size;
    this.tiles = Array.from({ length: size }, () =>
      new Array(size).fill(false),
    );
  }

  getTiles(): (boolean | Battleship)[][] {
    return [...this.tiles];
  }

  getValidTiles(): [number, number][] {
    const validTiles: [number, number][] = [];

    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        if (!this.tiles[i][j]) {
          validTiles.push([i, j]);
        }
      }
    }

    return validTiles;
  }

  placeShip(
    shipLength: number,
    location: [number, number],
    rotated: boolean = false,
  ): void {
    const validTiles = this.getValidTiles();
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
        !validTiles.some(
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
    });
  }

  receiveAttack(location: number[]): string {
    const tile = this.tiles[location[0]][location[1]];
    if (typeof tile === 'boolean') {
      if (tile === false) {
        this.tiles[location[0]][location[1]] = true;
        return 'miss';
      }
      return 'invalid';
    }
    const shipParts = tile.getParts();
    const shipOrigin = tile.getOrigin();
    const partToHit = (shipOrigin[0] - location[0]) + (shipOrigin[1] - location[1]);
    if (shipParts[partToHit] === false) {
      tile.hit(partToHit);
      return 'hit';
    }
    return 'invalid';
  }
}

export default Gameboard;
