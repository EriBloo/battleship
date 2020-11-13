import Battleship from '../Battleship';

test('returns Battleship object', () => {
  expect(new Battleship(3, [0, 0]).getParts()).toEqual([false, false, false]);
});

test('can be hit', () => {
  const battleship = new Battleship(3, [0, 0]);
  battleship.hit(2);
  expect(battleship.getParts()).toEqual([false, false, true]);
});

test("can't choose hit value heigher than length - 1", () => {
  expect(() => new Battleship(3, [0, 0]).hit(3)).toThrow();
});

test('isSunk returns correct value if ship is sunk', () => {
  const battleship = new Battleship(3, [0, 0]);
  battleship.hit(0);
  battleship.hit(1);
  battleship.hit(2);
  expect(battleship.isSunk()).toBe(true);
});

test('can\t modify ship parts directly', () => {
  const battleship = new Battleship(3, [0, 0]);
  battleship.getParts()[1] = true;
  expect(battleship.getParts()).toEqual([false, false, false]);
});
