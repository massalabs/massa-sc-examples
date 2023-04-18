import { Args } from '@massalabs/as-types';
import { play } from '../contracts/tictactoe';
import { resetStorage, Storage } from '@massalabs/massa-as-sdk';
import { constructor } from '../contracts/run';

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

    const args = new Args().add(0 as u32).serialize();
    play(args);

    const args2 = new Args().add(8 as u32).serialize();
    play(args2);

    const args3 = new Args().add(1 as u32).serialize();
    play(args3);

    const args4 = new Args().add(7 as u32).serialize();
    play(args4);

    const args5 = new Args().add(2 as u32).serialize();
    play(args5); // X should win here

    expect(Storage.get('gameWinner').toString()).toBe('X');
  });
});
