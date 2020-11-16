import Game from '../Game';

test('initilize game and make valid loop', () => {
  const game = new Game([1]);
  game.getCurrentPlayer.getBoard.placeShip(1, [0, 0]);
  game.init();
  const boardBeforeAttack = JSON.parse(JSON.stringify(game.getCurrentPlayer.getBoard.getTiles));
  game.loop([0, 0]);
  expect(game.getCurrentPlayer.getBoard.getTiles).not.toEqual(boardBeforeAttack);
});
