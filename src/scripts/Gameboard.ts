import Battleship from './Battleship';

class Gameboard {
  private size: number;
  private tiles: (boolean[] | Battleship[])[];

  constructor(size: number) {
    this.size = size;
    this.tiles = Array.from({ length: size }, () =>
      new Array(size).fill(false),
    );
  }

  getTiles(): (boolean[] | Battleship[])[] {
    // returns rep
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
    const markingOffset: number[][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    placementOffset.forEach((offset) => {
      // checks if ship placement is valid
      if (
        !validTiles.some(
          (tile) =>
            tile[0] === location[0] - offset[0] &&
            tile[1] === location[1] - offset[1],
        )
      ) {
        throw new Error('Invalid location.');
      }
      markingOffset.forEach((mark) => {
        // checks tiles around ship, so no touching ship placing is possible
        if (
          location[0] - offset[0] + mark[0] < 0 ||
          location[0] - offset[0] + mark[0] > this.size - 1 ||
          location[1] - offset[1] + mark[1] < 0 ||
          location[1] - offset[1] + mark[1] > this.size - 1
        ) {
          return;
        }
        if (
          this.tiles[location[0] - offset[0] + mark[0]][
            location[1] - offset[1] + mark[1]
          ] !== false
        ) {
          throw new Error('Invalid location.');
        }
      });
    });

    placementOffset.forEach((offset) => {
      this.tiles[location[0] - offset[0]][location[1] - offset[1]] = battleship;
    });
  }

  receiveAttack(location: number[]) {}
}

export default Gameboard;
