import Battleship from '../Battleship';

test('returns Battleship object',() => {
  expect(new Battleship(3).getParts()).toEqual([false, false, false]);
});

test('can be hit', () => {
  const battleship = new Battleship(3);
  battleship.hit(2);
  expect(battleship.getParts()).toEqual([false, true, false]);
});

test('can\'t choose hit value heigher than length',() => {
  expect(() => new Battleship(3).hit(4)).toThrow();
});

test('isSunk returns correct value if ship is sunk', () => {
  const battleship = new Battleship(3);
  battleship.hit(1);
  battleship.hit(2);
  battleship.hit(3);
  expect(battleship.isSunk()).toBe(true);
});
