import { Storage, generateEvent } from '@massalabs/massa-as-sdk';
import { isDeployingContract } from '@massalabs/massa-as-sdk/assembly/std/context';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - unused
 */
export function constructor(_: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!isDeployingContract()) {
    return [];
  }
  Storage.set('currentPlayer', 'X');
  Storage.set('gameState', 'n,n,n,n,n,n,n,n,n');
  Storage.set('gameWinner', 'n');
  return [];
}

@massaExport
export function play(index: u32): void {

  let gameWinner = Storage.get('gameWinner');
  if (gameWinner == 'n') {
    let player = Storage.get('currentPlayer');
    let gameState = Storage.get('gameState');
    let vecGameState = gameState.split(',');

    if (vecGameState[index] == 'n') {
      vecGameState[index] = player;
      Storage.set('gameState', vecGameState.join());
      if (player == 'X') {
        Storage.set('currentPlayer', 'O');
      } else {
        Storage.set('currentPlayer', 'X');
      }
      _checkWin(player);
    } else {
      generateEvent('Invalid move or case already played');
    }
  }
}

function _checkWin(player: string): void {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let gameState = Storage.get('gameState');
  let vecGameState = gameState.split(',');

  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = vecGameState[winCondition[0]];
    let b = vecGameState[winCondition[1]];
    let c = vecGameState[winCondition[2]];
    if (a == 'n' || b == 'n' || c == 'n') {
      continue;
    }
    if (a == b && b == c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    generateEvent(player + ' player has won round');
    Storage.set('gameWinner', player);
  }

  let roundDraw = !vecGameState.includes('n');
  if (roundDraw) {
    generateEvent('round resulted in a draw');
    Storage.set('gameWinner', 'draw');
  }
}
