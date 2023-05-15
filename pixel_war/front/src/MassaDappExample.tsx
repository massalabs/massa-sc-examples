import React, { useState, useEffect, useRef } from 'react';
import {
  Client,
  ClientFactory,
  DefaultProviderUrls,
  WalletClient,
  strToBytes,
  bytesToStr,
  Args,
  fromMAS,
} from '@massalabs/massa-web3';
import Box from '@mui/material/Box';
import { CompactPicker } from 'react-color';

const baseAccountSecretKey = 'S1cywdyu2HW9f4FAbhEsvviW5xZ3fM6XAGWgbASSSkfktjqWr5P';
const contractAddress = 'AS1HFJdcQ61PRJApbp5r938zBBhTRSJBsXkUzXRsTQBy69KaDSVB';
const gridSize = 300;
const cellBorderWidth = 0;

export const PixelWar: React.FunctionComponent = (): JSX.Element => {
  const [web3Client, setWeb3Client] = useState<Client | null>(null);
  const [pixels, setPixels] = useState<string[][]>(
    Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => '#FFFFFF'))
  );
  const [cellSize, setCellSize] = useState(10);
  const [colorPickerVisible, setColorPickerVisible] = useState(true); // Always visible
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [canvasContainerWidth, setCanvasContainerWidth] = useState(window.innerWidth);
  const [canvasContainerHeight, setCanvasContainerHeight] = useState(window.innerHeight);
  const [dragging, setDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [draggingOccurred, setDraggingOccurred] = useState(false);
  

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const calculateCanvasContainerDimensions = () => {
      setCanvasContainerWidth(window.innerWidth - 20);
      setCanvasContainerHeight(window.innerHeight - 75);
    };

    calculateCanvasContainerDimensions();
    window.addEventListener("resize", calculateCanvasContainerDimensions);

    return () => {
      window.removeEventListener("resize", calculateCanvasContainerDimensions);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current && pixels.length > 0) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, gridSize * (cellSize + cellBorderWidth), gridSize * (cellSize + cellBorderWidth));
        ctx.fillStyle = '#000';
      // Draw the grid cells
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          const pixelColor = pixels[x][y];
          ctx.fillStyle = pixelColor;
          ctx.fillRect(
            x * (cellSize + cellBorderWidth) + cellBorderWidth,
            y * (cellSize + cellBorderWidth) + cellBorderWidth,
            cellSize,
            cellSize
          );
  }
}
        // Draw the grid border
        ctx.strokeStyle = '#000'; // Set the border color to black
        ctx.lineWidth = cellBorderWidth;
        ctx.strokeRect(
          cellBorderWidth / 2,
          cellBorderWidth / 2,
          gridSize * (cellSize + cellBorderWidth) - cellBorderWidth,
          gridSize * (cellSize + cellBorderWidth) - cellBorderWidth
        );
      }
    }
  }, [pixels, cellSize]);

  useEffect(() => {
    (async () => {
      const baseAccount = await WalletClient.getAccountFromSecretKey(baseAccountSecretKey);
      const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, true, baseAccount);
      setWeb3Client(web3Client);
    })();
  }, []);

  useEffect(() => {
    const fetchAndUpdatePixels = async () => {
      if (!web3Client) return;

      const batchSize = 22000;
      const totalPixels = gridSize * gridSize;
      const batchCount = Math.ceil(totalPixels / batchSize);

      let newFetchedPixels: string[][] = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => "#FFFFFF")
    );

    for (let batchIndex = 0; batchIndex < batchCount; batchIndex++) {
      const startPixelIndex = batchIndex * batchSize;
      const endPixelIndex = Math.min(startPixelIndex + batchSize, totalPixels);

      const entriesBatch = Array.from({ length: endPixelIndex - startPixelIndex }, (_, i) => {
        const index = startPixelIndex + i;
        const x = Math.floor(index / gridSize);
        const y = index % gridSize;
        const pixelKey = `${x}${y}`;
        return { address: contractAddress, key: strToBytes(pixelKey) };
      });

      const entries = await web3Client.publicApi().getDatastoreEntries(entriesBatch);

      entries.forEach((entry, i) => {
        const index = startPixelIndex + i;
        const x = Math.floor(index / gridSize);
        const y = index % gridSize;
        const color = entry?.candidate_value ? bytesToStr(entry.candidate_value as Uint8Array) : "FFFFFF";
        newFetchedPixels[x][y] = `#${color}`;
      });
    }

    setPixels(newFetchedPixels);
  };

  fetchAndUpdatePixels();
}, [web3Client]);


const maxCellSize = 40; 
const minCellSize = 1; 

useEffect(() => {
  const calculateCellSize = () => {
  const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
  const calculatedSize = Math.floor(smallerDimension / (gridSize * Math.max(zoomLevel, 1) + (gridSize - 1) * cellBorderWidth));
  const minCellSize = 2;
  setCellSize(Math.max(calculatedSize, minCellSize));
};

  calculateCellSize();
  window.addEventListener("resize", calculateCellSize);

  return () => {
    window.removeEventListener("resize", calculateCellSize);
  };
}, [zoomLevel]);

const getPixelCoordinates = (event: React.MouseEvent<HTMLCanvasElement>) => {
  if (!canvasRef.current) return null;

  const rect = canvasRef.current.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / (cellSize + cellBorderWidth));
  const y = Math.floor((event.clientY - rect.top) / (cellSize + cellBorderWidth));

  return { x, y };
};

const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
  const coordinates = getPixelCoordinates(event);
  if (coordinates) {
    handlePixelClick(coordinates.x, coordinates.y);
  }
};

const handlePixelClick = async (x: number, y: number) => {
  const newColor = currentColor.slice(1); // Remove '#' from the color string

  if (draggingOccurred) {
    return; // If dragging occurred, cancel click event (to prevent accidental pixel placements after dragging)
  }

  if (web3Client) {
    let args = new Args();
    args.addI32(x).addI32(y).addString(newColor);

    await web3Client.smartContracts().callSmartContract({
      fee: fromMAS(0),
      maxGas: fromMAS(0.1),
      coins: fromMAS(0.1),
      targetAddress: contractAddress,
      functionName: "setPixel",
      parameter: args.serialize(),
    });

    setPixels((prevPixels) => {
      const newPixels = [...prevPixels];
      newPixels[x] = [...newPixels[x]];
      newPixels[x][y] = `#${newColor}`;
      return newPixels;
    });
  }
};
const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
  if (dragging) {
    handleMouseMove(event);
  } else {
    if (!pixels.length || !canvasRef.current) return;

    const coordinates = getPixelCoordinates(event);
    if (coordinates) {
      const { x, y } = coordinates;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, gridSize * (cellSize + cellBorderWidth), gridSize * (cellSize + cellBorderWidth));
        ctx.fillStyle = "#000"; 

        // Draw the grid cells
        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            const pixelColor = pixels[x][y];
            ctx.fillStyle = pixelColor;
            ctx.fillRect(
              x * (cellSize + cellBorderWidth) + cellBorderWidth,
              y * (cellSize + cellBorderWidth) + cellBorderWidth,
              cellSize,
              cellSize
            );
          }
        }

        // Draw the grid border
        ctx.strokeStyle = "#000";
        ctx.lineWidth = cellBorderWidth;
        ctx.strokeRect(
          cellBorderWidth / 2,
          cellBorderWidth / 2,
          gridSize * (cellSize + cellBorderWidth) - cellBorderWidth,
          gridSize * (cellSize + cellBorderWidth) - cellBorderWidth
        );

        ctx.fillStyle = currentColor;
        ctx.fillRect(
          x * (cellSize + cellBorderWidth) + cellBorderWidth,
          y * (cellSize + cellBorderWidth) + cellBorderWidth,
          cellSize,
          cellSize
        );
      }
    }
  }
};

const handleColorChange = (color: any) => {
  setCurrentColor(color.hex);
};

const handleMouseWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
  event.preventDefault();

  if (event.deltaY < 0) {
    // Zoom in
    setCellSize((prevCellSize) => Math.min(prevCellSize + 1, maxCellSize));
  } else {
    // Zoom out
    setCellSize((prevCellSize) => Math.max(prevCellSize - 1, minCellSize));
  }
};

useEffect(() => {
  const handleWheel = (event: WheelEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        event.preventDefault();
      }
    }
  };

  window.addEventListener('wheel', handleWheel, { passive: false });

  return () => {
    window.removeEventListener('wheel', handleWheel);
  };
}, []);

const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
  setDragging(true);
  setLastPosition({ x: event.clientX, y: event.clientY });
  setDraggingOccurred(false);
};

const handleMouseUp = () => {
  setDragging(false);
};
useEffect(() => {
  window.addEventListener('mouseup', handleMouseUp);

  return () => {
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, []);

const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
  if (dragging) {
    const container = event.currentTarget.parentElement;
    if (!container) return;
    
    const deltaX = lastPosition.x - event.clientX;
    const deltaY = lastPosition.y - event.clientY;

    container.scrollLeft += deltaX;
    container.scrollTop += deltaY;

    setLastPosition({ x: event.clientX, y: event.clientY });
    setDraggingOccurred(true);
  }
};

return (
  <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex' }}>
    <div
      style={{
        position: 'relative',
        overflow: 'auto',
        width: canvasContainerWidth,
        height: canvasContainerHeight,
      }}
    >
      <canvas
  ref={canvasRef}
  width={gridSize * (cellSize + cellBorderWidth)}
  height={gridSize * (cellSize + cellBorderWidth)}
  onClick={handleCanvasClick}
  onMouseMove={handleCanvasMouseMove}
  onWheel={handleMouseWheel}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
/>
    </div>
    {colorPickerVisible && (
      <div style={{ position: 'fixed', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
        <CompactPicker color={currentColor} onChange={handleColorChange} />
      </div>
    )}
  </Box>
);
};

