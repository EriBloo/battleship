import Player from '../Player';
import Gameboard from '../Gameboard';

test('chooseAttack works', () => {
  const player = new Player(new Gameboard(1), true);
  const enemyBoard = new Gameboard(1);
  expect(player.chooseAttack(enemyBoard.getBoardStates)).toEqual([0, 0]);
});
