import { Storage, callerHasWriteAccess, generateEvent, Context } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

interface LeaderboardEntry {
  address: string;
  pixelCount: i32;
}

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): StaticArray<u8> {
  if (!callerHasWriteAccess()) {
    return [];
  }
  const gridSize = 500;
  Storage.set("GRID_SIZE", gridSize.toString());
  Storage.set(pixelCoordKey(15, 15), "2a45c6");
  Storage.set("leaderboard", "");
  // An arbitrary pixel is set to a random color to show that the contract is working
  // Emit an event to the blockchain
  generateEvent(`Pixel War initiated`);
  return [];
}

function getLeaderboard(): string {
  return Storage.get("leaderboard");
}

// Helper function to set the leaderboard in storage
function setLeaderboard(leaderboard: string): void {
  Storage.set("leaderboard", leaderboard);
}

export function setPixel(_args: StaticArray<u8>): void {
  const args = new Args(_args);
  // Get the pixel coordinates and color from the arguments and check if they are valid
  const x = args
    .nextI32()
    .expect('X coordinate argument is missing or invalid');
  const y = args
    .nextI32()
    .expect('Y coordinate argument is missing or invalid');
  const color = args
    .nextString()
    .expect('Color argument is missing or invalid');

  const gridSize = parseInt(Storage.get("GRID_SIZE"));

  // Check if the coordinates are within the grid size
  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
    return;
  }
  let caller = Context.caller().toString();
  let leaderboard: string = getLeaderboard();
  let entryStrings: Array<string> = leaderboard.length > 0 ? leaderboard.split("; ") : new Array<string>();
  
  let entries = new Array<Array<string>>();
  for (let i = 0; i < entryStrings.length; i++) {
    entries.push(entryStrings[i].split(" "));
  }

  let found = false;
  
  for (let i = 0; i < entries.length; i++) {
    if (entries[i][0] == caller) {
      // Increment the pixel count for the caller
      entries[i][1] = (I32.parseInt(entries[i][1]) + 1).toString();
      found = true;
      break;
    }
  }
  
  if (!found) {
    entries.push([caller, "1"]);
  }

  let updatedEntries = new Array<string>();
  for (let i = 0; i < entries.length; i++) {
    updatedEntries.push(entries[i].join(" "));
  }
  
  // Store the new leaderboard in the storage of the contract
  setLeaderboard(updatedEntries.join("; "));
  // Store the new color in the storage of the contract
  const pixelKey = pixelCoordKey(x, y);
  Storage.set(pixelKey, color);
}

export function getPixel(_args: StaticArray<u8>): void {
  const args = new Args(_args);
  const x = args
    .nextI32()
    .expect('X coordinate argument is missing or invalid');
  const y = args
    .nextI32()
    .expect('Y coordinate argument is missing or invalid');
  const pixelKey = pixelCoordKey(x, y);
  const color = Storage.get(pixelKey);
  generateEvent("This pixel color is "+color);
}

// This function is used within the contract to generate the key of a pixel that will be stored in the storage
export function pixelCoordKey(x: i32, y: i32): string {
  return x.toString() + y.toString();
}
