class Battleship {
  private parts: boolean[];
  private origin: number[]; // where the bow of the ship is

  constructor(shipLength: number, origin: number[]) {
    this.parts = new Array(shipLength).fill(false);
    this.origin = origin;
  }

  get getParts(): boolean[] {
    return this.parts;
  }

  get getLength(): number {
    return this.parts.length;
  }

  get getOrigin(): number[] {
    return this.origin;
  }

  hit(part: number): void {
    // hits part of the ship, parts are in range from 1 to battleship.length
    if (part > this.parts.length - 1) {
      throw new Error(
        `Can\'t choose value heigher than ships length - 1 (${
          this.getLength - 1
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
