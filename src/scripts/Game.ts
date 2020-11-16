import Player from './Player';
import Gameboard from './Gameboard';
import Battleship from './Battleship'

class Game {
  private shipSizes: number[];
  private players: Player[];
  private currentPlayer: 0 | 1;
  private initialized: boolean;
  private winner: -1 | 0 | 1;

  constructor(shipSizes: number[]) {
    this.shipSizes = shipSizes;
    this.players = [
      new Player(new Gameboard(10)),
      new Player(new Gameboard(10)),
    ];
    this.currentPlayer = 0;
    this.initialized = false;
    this.winner = -1;
  }

  init() {
    if (this.players[0].getBoard.getShips.length === this.shipSizes.length) {
      this.players[1].getBoard.distributeShips(this.shipSizes);
      this.initialized = true;
    }
  }

  get getCurrentPlayer(): Player {
    return this.players[this.currentPlayer];
  }

  get getOpponent(): Player {
    return this.players[1 - this.currentPlayer];
  }

  next(): void {
    this.currentPlayer = <0 | 1>(1 - this.currentPlayer);
  }

  playerTurn(location: [number, number]): boolean {
    return this.getOpponent.getBoard.receiveAttack(location);
  }

  computerTurn(): void {
    let attack: [number, number];
    let success: boolean = false;
    do {
      attack = <[number, number]>(
        this.getCurrentPlayer.chooseAttack(
          this.getOpponent.getBoard.getBoardStates,
        )
      );
      success = this.getOpponent.getBoard.receiveAttack(attack);
    } while (!success);
  }

  loop(location: [number, number]): void {
    if (this.initialized) {
      const success = this.playerTurn(location);
      if (success) {
        this.winner = this.isWinner();
        this.next();
        if (this.winner === -1) {
          this.computerTurn();
          this.next();
        }
      }
    }
  }

  isWinner(): -1 | 0 | 1 {
    return this.getOpponent.getBoard.allSunk() ? this.currentPlayer : -1;
  }
}

export default Game;
