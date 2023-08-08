import React, { useState, useEffect, useRef } from 'react';
import {
  IClient,
  ClientFactory,
  strToBytes,
  bytesToStr,
  Args,
  fromMAS,
} from '@massalabs/massa-web3';
import { IAccount, providers } from "@massalabs/wallet-provider"
import Box from '@mui/material/Box';
import { CompactPicker } from 'react-color';
import throttle from "lodash.throttle";
import Loader from './Loader';

const contractAddress = 'AS14VxADpg7hPmZixzuMTYoxSnzo1aMJEtwSwJNUhqaqpei3omUw';
const gridSize = 300;
const cellBorderWidth = 0;


export const PixelWar: React.FunctionComponent = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [client, setClient] = useState<IClient | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);
  const [lastOpId, setlastOpId] = useState<string | null>(null);
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
  const [prevHoveredCell, setPrevHoveredCell] = useState<{ x: number; y: number } | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<{ address: string, pixelCount: string }[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);


  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const registerAndSetProvider = async () => {
      try {
        let provider = (await providers(true, 10000))[0];
        let accounts = await provider.accounts();
        if (accounts.length === 0) {
          setErrorMessage("No accounts found");
          return;
        }
        setAccount(accounts[0]);
        if (!account || !provider) {
          return;
        }
        setClient(await ClientFactory.fromWalletProvider(provider, account));
      } catch (e) {
        console.log(e);
        setErrorMessage("Please install massa station and the wallet plugin of Massa Labs and refresh.");
      }
      finally {
        setLoading(false);
    }
    };

    registerAndSetProvider();
  }, [account]);

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
    const fetchAndUpdatePixels = async () => {
      if (!client) return;

      const batchSize = 11000;
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

      const entries = await client.publicApi().getDatastoreEntries(entriesBatch);

      entries.forEach((entry, i) => {
        const index = startPixelIndex + i;
        const x = Math.floor(index / gridSize);
        const y = index % gridSize;
        let color = entry?.candidate_value ? bytesToStr(entry.candidate_value as Uint8Array) : "";
      if (color.length !== 6) {
          color = "FFFFFF";
      }
      newFetchedPixels[x][y] = `#${color}`;
      });
    }
    setPixels(newFetchedPixels);
  };

  fetchAndUpdatePixels();
}, [client]);


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

  if (client && account) {
    let args = new Args();
    args.addI32(x).addI32(y).addString(newColor);

    try {
      await client.smartContracts().callSmartContract({
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
    } catch (error) {
      console.error("Error in signing or submitting the transaction:", error);
    }
  }
};

const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
  if (dragging) {
      handleMouseMove(event);
  } else {
      if (!pixels.length || !previewCanvasRef.current) return;

      const coordinates = getPixelCoordinates(event);
      const ctx = previewCanvasRef.current.getContext("2d");

      if (!coordinates || !ctx) return;

      // Clear the entire secondary canvas
      ctx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);

      // Get the exact position for drawing
      const { x, y } = coordinates;

      // Draw the hovered pixel on the secondary canvas with the selected color
      ctx.fillStyle = currentColor;
      ctx.fillRect(
          x * (cellSize + cellBorderWidth) + cellBorderWidth,
          y * (cellSize + cellBorderWidth) + cellBorderWidth,
          cellSize,
          cellSize
      );
  }
};



const handleColorChange = (color: any) => {
  setCurrentColor(color.hex);
};

const handleMouseWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {

  if (event.deltaY < 0) {
    // Zoom in
    setCellSize((prevCellSize) => Math.min(prevCellSize + 1, maxCellSize));
    setIsZoomed(true);
  } else {
    // Zoom out
    setCellSize((prevCellSize) => Math.max(prevCellSize - 1, minCellSize));
    setIsZoomed(true);
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

const fetchLeaderboard = async () => {
  try {
      if (!account || !client) {
        return "";
      }
  const n_posts_str = await client.publicApi().getDatastoreEntries([{ address: contractAddress, key: strToBytes('leaderboard') }]);
  if(!n_posts_str[0]) {
      return "";
  }
  if (n_posts_str[0].candidate_value !== null) {
      const leaderboardString = bytesToStr(n_posts_str[0].candidate_value);
      console.log(leaderboardString);
      return leaderboardString;
  }
  return "";
  } catch (error) {
  console.error(error);
}
return "";
};

useEffect(() => {
  const fetchData = async () => {
    const leaderboardString3 = await fetchLeaderboard();
    const leaderboardArray = leaderboardString3.split(";").map(entry => {
      const [address, pixelCount] = entry.trim().split(" ");
      return { address, pixelCount };
    });

    const topFiveLeaderboard = leaderboardArray.slice(0, 5); // Get the top five entries
    setLeaderboardData(topFiveLeaderboard);
  }
  fetchData();
});





useEffect(() => {
  const fetchData = async () => {
    const leaderboardString2 = await fetchLeaderboard();
    const leaderboardArray = leaderboardString2.split(";").map(entry => {
      const [address, pixelCount] = entry.trim().split(" ");
      return { address, pixelCount };
    });

    setLeaderboardData(leaderboardArray);
  };

  fetchData();
}, []);

const handleCanvasMouseMoveThrottled = throttle(handleCanvasMouseMove, 100);

if (loading) {
  return <Loader />;
}     
else if (errorMessage) {
  return (
      <div className="relative bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-5xl p-8 box-border rounded-lg shadow-md mb-12 mx-auto">
          <div className="text-red-500">{errorMessage}</div>
      </div>
  );
} 
else {
  return (
    
    <Box sx={{ flexGrow: 1, position: 'relative', justifyContent: 'right', alignItems: 'right' }}>
      {!isZoomed && (
      <div id="leaderboard-container">
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Pixels Placed</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map(item => (
              <tr key={item.address}>
                <td>{item.address}</td>
                <td>{item.pixelCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      <div
        style={{
          position: 'relative',
          overflow: 'auto',
          width: canvasContainerWidth,
          height: canvasContainerHeight,
          display: 'flex',         
          justifyContent: 'center', 
          alignItems: 'center'   
        }}
      >
        {/* Main canvas */}
        <canvas
          ref={canvasRef}
          width={gridSize * (cellSize + cellBorderWidth)}
          height={gridSize * (cellSize + cellBorderWidth)}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMoveThrottled}
          onWheel={handleMouseWheel}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
  
        {/* Preview canvas */}
        <canvas
          ref={previewCanvasRef}  
          width={gridSize * (cellSize + cellBorderWidth)}
          height={gridSize * (cellSize + cellBorderWidth)}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
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
}

