import Gameboard from '../Gameboard';
import Battleship from '../Battleship';

test('returns empty gameboard after creation', () => {
  expect(new Gameboard(3).getBoard()).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
});

test('allows placing ship', () => {
  const board = new Gameboard(3);
  board.placeShip(1, [1, 1], 'vertical');
  expect(board.getBoard()).toEqual([
    [true, true, true],
    [true, new Battleship(1), true],
    [true, true, true],
  ]);
});

test('throw error if we try to place ship in occupied space', () => {
  const board = new Gameboard(3);
  board.placeShip(1, [1, 1], 'vertical');
  expect(() => board.placeShip(1, [1, 1], 'vertical')).toThrow();
});

test('correctly places ship horizontally', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2);
  board.placeShip(2, [1, 1], 'horizontal');
  expect(board.getBoard()).toEqual([
    [true, true, true],
    [ship, ship, true],
    [true, true, true],
  ]);
});

test('correctly places ship vertically', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2);
  board.placeShip(2, [1, 1], 'vertical');
  expect(board.getBoard()).toEqual([
    [true, ship, true],
    [true, ship, true],
    [true, true, true],
  ]);
});

test("throws if any part of the ship wouldn't fit on the board", () => {
  const board = new Gameboard(3);
  expect(() => board.placeShip(4, [1, 1], 'horizontal')).toThrow();
});
