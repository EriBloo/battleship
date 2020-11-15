import Game from '../Game';

test('computer makes valid attack', () => {
  const game = new Game();
  const boardBeforeAttack = JSON.parse(JSON.stringify(game.getCurrentPlayer().getBoard.getTiles));
  game.next();
  game.loop();
  expect(game.getCurrentPlayer().getBoard.getTiles).not.toEqual(boardBeforeAttack);
});
