import { Storage, callerHasWriteAccess, generateEvent } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

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
  // An arbitrary pixel is set to a random color to show that the contract is working
  // Emit an event to the blockchain
  generateEvent(`Pixel War initiated`);
  return [];
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