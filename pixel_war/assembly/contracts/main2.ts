import { Storage, callerHasWriteAccess, generateEvent } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';
import { JSON } from 'json-as';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): StaticArray<u8> {
    if (!callerHasWriteAccess()) {
      return [];
    }
  
    const gridSize = 200;
  
    // Initialize the pixel grid in the storage of the contract
    const gridArray: Array<string> = new Array<string>(gridSize * gridSize);
  
    for (let i = 0; i < gridSize * gridSize; i++) {
      gridArray[i] = "FFFFFF"; // Initialize with a white color (hexadecimal RGB value)
    }
  
    // Set the gridSize and gridArray in the storage of the contract
    Storage.set("GRID_SIZE", gridSize.toString());
    Storage.set("PIXEL_GRID", arrayToString(gridArray));
  
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
  
    const gridSize = I32.parseInt(Storage.get("GRID_SIZE"));
  
    // Check if the coordinates are within the grid size
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
      return;
    }
  
    // Get the gridArray from the storage, update the pixel color, and store it back
    const gridArray = stringToArray(Storage.get("PIXEL_GRID"));
    const index = y * gridSize + x;
    gridArray[index] = color;
    Storage.set("PIXEL_GRID", arrayToString(gridArray));
  }

function arrayToString(arr: Array<string>): string {
return arr.join(',');
}

function stringToArray(str: string): Array<string> {
return str.split(',', -1);
    }