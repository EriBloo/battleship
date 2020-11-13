import Gameboard from '../Gameboard';
import Battleship from '../Battleship';

test('returns empty gameboard after creation', () => {
  expect(new Gameboard(3).getTiles()).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
});

test('allows placing ship', () => {
  const board = new Gameboard(3);
  board.placeShip(1, [1, 1], true);
  expect(board.getTiles()).toEqual([
    [false, false, false],
    [false, new Battleship(1, [1, 1]), false],
    [false, false, false],
  ]);
});

test('throw error if we try to place ship in occupied space', () => {
  const board = new Gameboard(3);
  board.placeShip(1, [1, 1], true);
  expect(() => board.placeShip(1, [1, 1], true)).toThrow();
});

test('correctly places ship horizontally', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2, [1, 1]);
  board.placeShip(2, [1, 1], false);
  expect(board.getTiles()).toEqual([
    [false, false, false],
    [ship, ship, false],
    [false, false, false],
  ]);
});

test('correctly places ship vertically', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2, [1, 1]);
  board.placeShip(2, [1, 1], true);
  expect(board.getTiles()).toEqual([
    [false, ship, false],
    [false, ship, false],
    [false, false, false],
  ]);
});

test('2 ships placement test', () => {
  const board = new Gameboard(5);
  const ship1 = new Battleship(2, [1, 1]);
  board.placeShip(2, [1, 1], true);
  const ship2 = new Battleship(4, [4, 4]);
  board.placeShip(4, [4, 4], false);
  expect(board.getTiles()).toEqual([
    [false, ship1, false, false, false],
    [false, ship1, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, ship2, ship2, ship2, ship2],
  ]);
});

test("throws if any part of the ship wouldn't fit on the board", () => {
  const board = new Gameboard(3);
  expect(() => board.placeShip(4, [1, 1], false)).toThrow();
});

test("can't place ships touching each other", () => {
  const board = new Gameboard(5);
  board.placeShip(2, [1, 1], true);
  expect(() => board.placeShip(4, [4, 2], true)).toThrow();
});
