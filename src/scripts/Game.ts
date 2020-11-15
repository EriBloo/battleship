import Player from './Player';
import Gameboard from './Gameboard';

class Game {
  private players: Player[];
  private currentPlayer: number;

  constructor() {
    this.players = [
      new Player(new Gameboard(10), false),
      new Player(new Gameboard(10), true),
    ];
    this.currentPlayer = 0;
  }

  next(): void {
    this.currentPlayer = 1 - this.currentPlayer;
  }

  loop(): void {
    if (this.getCurrentPlayer().isComputer) {
      let attack: [number, number];
      let success: boolean = false;
      do {
        attack = <[number, number]>(
          this.getCurrentPlayer().chooseAttack(
            this.getOpponent().getBoard.getBoardStates,
          )
        );
        success = this.getOpponent().getBoard.receiveAttack(attack);
      } while (!success);
      this.next();
    }
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayer];
  }

  getOpponent(): Player {
    return this.players[1 - this.currentPlayer];
  }
}

export default Game;
