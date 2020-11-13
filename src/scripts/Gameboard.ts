import Battleship from './Battleship';

type direction = 'vertical' | 'horizontal';

class Gameboard {
  private size: number;
  private tiles: boolean[][] | Battleship[][];
  private shots: boolean[][];

  constructor(size: number) {
    this.size = size;
    this.tiles = Array.from({ length: size }, () =>
      new Array(size).fill(false),
    );
    this.shots = Array.from({ length: size }, () =>
      new Array(size).fill(false),
    );
  }

  getBoard(): boolean[][] | Battleship[][] {
    return this.tiles;
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
    direction: direction,
  ): void {
    const validTiles = this.getValidTiles();
    const battleship = new Battleship(shipLength);
    const placementOffset: number[][] = Array.from(
      { length: shipLength },
      (_, k) => (direction === 'vertical' ? [k, 0] : [0, k]),
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
        if (
          location[0] - offset[0] + mark[0] < 0 ||
          location[0] - offset[0] + mark[0] > this.size - 1 ||
          location[1] - offset[1] + mark[1] < 0 ||
          location[1] - offset[1] + mark[1] > this.size - 1
        ) {
          return;
        }
        if (
          !this.tiles[location[0] - offset[0] + mark[0]][
            location[1] - offset[1] + mark[1]
          ]
        ) {
          this.tiles[location[0] - offset[0] + mark[0]][
            location[1] - offset[1] + mark[1]
          ] = true;
        }
      });
      this.tiles[location[0] - offset[0]][location[1] - offset[1]] = battleship;
      console.log(this.getBoard());
    });
  }
}

export default Gameboard;
