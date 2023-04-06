/* Age SC Implementation for Massa Labs
 *
 * */
import { Storage, generateEvent, Args, toBytes, fromBytes } from "@massalabs/massa-as-sdk";

export function initialize(_args: StaticArray<u8>): void {
    Storage.set(toBytes("currentPlayer"), toBytes('X'));
    Storage.set(toBytes("gameState"), toBytes("n,n,n,n,n,n,n,n,n"));
    Storage.set(toBytes("gameWinner"), toBytes('n'));
}

export function play(args: StaticArray<u8>): void {
    let args_object = new Args(args);
    let index = args_object.nextU32();
    let game_winner = fromBytes(Storage.get(toBytes("gameWinner")));
    if (game_winner == "n") {
        let player = fromBytes(Storage.get(toBytes("currentPlayer")));
        let game_state = fromBytes(Storage.get(toBytes("gameState")));
        let vec_game_state = game_state.split(",");
        if (vec_game_state[index] == "n") {
            vec_game_state[index] = player;
            Storage.set(toBytes("gameState"), toBytes(vec_game_state.join()));
            if (player == "X") {
                Storage.set(toBytes("currentPlayer"), toBytes("O"));
            }
            else {
                Storage.set(toBytes("currentPlayer"), toBytes("X"));
            }
            _checkWin(player)
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
        [2, 4, 6]
    ];

    let game_state = fromBytes(Storage.get(toBytes("gameState")));
    let vec_game_state = game_state.split(",");

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = vec_game_state[winCondition[0]];
        let b = vec_game_state[winCondition[1]];
        let c = vec_game_state[winCondition[2]];
        if (a == "n" || b == "n" || c == "n") {
            continue;
        }
        if (a == b && b == c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        generateEvent(player + " player has won round");
        Storage.set(toBytes("gameWinner"), toBytes(player));
    }

    let roundDraw = !vec_game_state.includes("n");
    if (roundDraw) {
        generateEvent("round resulted in a draw");
        Storage.set(toBytes("gameWinner"), toBytes("draw"));
    }
}
