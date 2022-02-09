/* Tic Tac Toe Implementation for Massa Labs
 *
 * */
import { Storage, print } from "massa-sc-std";
import { JSON } from "json-as";

@json
export class PlayArgs {
    x: u32 = 0;
    y: u32 = 0;
}

export function initialize(_args: string): void {
    Storage.set_data("currentPlayer", "X");
    Storage.set_data("gameState", "n,n,n,n,n,n,n,n,n");
}

export function play(_args: string): void {
    const args = JSON.parse<PlayArgs>(_args);
    let player = Storage.get_data("currentPlayer");
    print("Current player is: " + player)
    let game_state = Storage.get_data("gameState");
    print("Current game state is: " + game_state);
    let vec_game_state = game_state.split(",");
    assert(args.x >= 0);
    assert(args.y >= 0);
    assert(args.x < 3);
    assert(args.y < 3);
    vec_game_state[args.x + args.y * 3] = player;
    Storage.set_data("gameState", vec_game_state.join());
    print("New game state is: " + Storage.get_data("gameState"))
    if (player == "X") {
        Storage.set_data("currentPlayer", "O");
    }
    else {
        Storage.set_data("currentPlayer", "X");
    }
    _checkWin()
}

function _checkWin(): void {
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

    let game_state = Storage.get_data("gameState");
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
        print("Game ended, one player won")
    }

    let roundDraw = !vec_game_state.includes("n");
    if (roundDraw) {
        print("Draw. Game ended.")
    }
}
