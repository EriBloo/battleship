class Battleship {

  private parts: boolean[];

  constructor(shipLength: number) {
    this.parts = Array.from({ length: shipLength }, () => false);
  }

  getParts(): boolean[] {
    // returns representation of ship parts array
    return this.parts;
  }

  getLength(): number {
    return this.parts.length;
  }

  hit(part: number): void {
    // hits part of the ship, parts are in range from 1 to battleship.length
    if (part - 1 > this.parts.length - 1) {
      throw new Error(`Can\'t choose value heigher than ships length(${this.getLength})`);
    }
    this.parts[part - 1] = true;
  }

  isSunk(): boolean {
    return this.parts.every((part) => part);
  }
}

export default Battleship;