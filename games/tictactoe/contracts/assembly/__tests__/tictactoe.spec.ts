import { Args } from '@massalabs/as-types';
import { play } from '../contracts/tictactoe';
import { resetStorage, Storage } from '@massalabs/massa-as-sdk';

describe('Check tictactoe', () => {
  beforeEach(() => {
    resetStorage(); // We make sure that the contract's storage is empty before each test.
  });

  afterAll(() => {
    resetStorage(); // We make sure that the contract's storage is reset.
  });

  test('Check if the game is won', () => {
    // mock constructor
    Storage.set('currentPlayer', 'X');
    Storage.set('gameState', 'n,n,n,n,n,n,n,n,n');
    Storage.set('gameWinner', 'n');

    play(0);

    play(8);

    play(1);

    const args4 = new Args().add(7).serialize();
    play(7);

    play(2); // X should win here

    expect(Storage.get('gameWinner').toString()).toBe('X');
  });
});
