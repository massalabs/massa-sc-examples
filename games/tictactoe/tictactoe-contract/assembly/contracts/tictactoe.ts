import { Storage, generateEvent, callerHasWriteAccess} from "@massalabs/massa-as-sdk";
import { Args } from "@massalabs/as-types";
import { isDeployingContract } from "@massalabs/massa-as-sdk/assembly/std/context";

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
    Storage.set("currentPlayer", 'X');
    Storage.set("gameState", "n,n,n,n,n,n,n,n,n");
    Storage.set("gameWinner", 'n');
    return [];
  }

export function play(args: StaticArray<u8>): void {

    let args_object = new Args(args);
    let index = args_object.nextU32().unwrap();
    let game_winner = Storage.get("gameWinner");
    if (game_winner == "n") {
        let player = Storage.get("currentPlayer");
        let game_state = Storage.get("gameState");
        let vec_game_state = game_state.split(",");

        if (vec_game_state[index] == "n") {
            vec_game_state[index] = player;
            Storage.set("gameState", vec_game_state.join());
            if (player == "X") {
                Storage.set("currentPlayer", "O");
            }
            else {
                Storage.set("currentPlayer", "X");
            }
            _checkWin(player)
        }
        else {
            generateEvent("Invalid move or case already played");
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

    let game_state = Storage.get("gameState");
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
        Storage.set("gameWinner", player);
    }

    let roundDraw = !vec_game_state.includes("n");
    if (roundDraw) {
        generateEvent("round resulted in a draw");
        Storage.set("gameWinner", "draw");
    }
}