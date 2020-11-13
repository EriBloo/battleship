class Battleship {
  private parts: boolean[];

  constructor(shipLength: number) {
    this.parts = new Array(shipLength).fill(false);
  }

  getParts(): boolean[] {
    // returns representation of ship parts array
    return [...this.parts];
  }

  getLength(): number {
    return this.parts.length;
  }

  hit(part: number): void {
    // hits part of the ship, parts are in range from 1 to battleship.length
    if (part > this.parts.length - 1) {
      throw new Error(
        `Can\'t choose value heigher than ships length - 1 (${
          this.getLength() - 1
        })`,
      );
    }
    this.parts[part] = true;
  }

  isSunk(): boolean {
    return this.parts.every((part) => part);
  }
}

export default Battleship;
