import React, { useState, useEffect } from 'react';
import { Client, ClientFactory, DefaultProviderUrls, WalletClient, strToBytes, bytesToStr, Args, fromMAS } from '@massalabs/massa-web3';
import Box from '@mui/material/Box';
import { ChromePicker } from 'react-color';

const baseAccountSecretKey = 'S1cywdyu2HW9f4FAbhEsvviW5xZ3fM6XAGWgbASSSkfktjqWr5P';
const contractAddress = 'AS1HFJdcQ61PRJApbp5r938zBBhTRSJBsXkUzXRsTQBy69KaDSVB';
const gridSize = 500;

export const PixelWar: React.FunctionComponent = (): JSX.Element => {
  const [web3Client, setWeb3Client] = useState<Client | null>(null);
  const [pixels, setPixels] = useState<string[][]>([]);
  const [cellSize, setCellSize] = useState(10);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null);

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
        console.log(entries);
  
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

  useEffect(() => {
    const calculateCellSize = () => {
      const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
      const calculatedSize = Math.floor(smallerDimension / gridSize);
      const minCellSize = 2; // Set a minimum cell size to ensure cells are always visible
      setCellSize(Math.max(calculatedSize, minCellSize));
      console.log(Math.max(calculatedSize, minCellSize));
    };

    calculateCellSize();
    window.addEventListener('resize', calculateCellSize);

    return () => {
      window.removeEventListener('resize', calculateCellSize);
    };
  }, []);


  const handlePixelClick = (x: number, y: number) => {
    setSelectedPixel({ x, y });
    setColorPickerVisible(true);
  };

  const handleColorChange = (color: any) => {
    setCurrentColor(color.hex);
  };

  const handleColorPickerClose = async () => {
    setColorPickerVisible(false);
    if (selectedPixel && web3Client) {
      const newColor = currentColor.slice(1); // Remove '#' from the color string
      let args = new Args();
      args.addI32(selectedPixel.x).addI32(selectedPixel.y).addString(newColor);
      console.log(selectedPixel.x, selectedPixel.y, newColor);
    await web3Client.smartContracts().callSmartContract({
      /// storage fee for taking place in books
      fee: fromMAS(0),
      /// The maximum amount of gas that the execution of the contract is allowed to cost
      maxGas: fromMAS(0.1),
  /// Extra coins that are spent from the caller's parallel balance and transferred to the target
  coins: fromMAS(0.1),
  /// Target smart contract address
  targetAddress: contractAddress,
  /// Target function name. No function is called if empty.
  functionName: 'setPixel',
  /// Parameter to pass to the target function
  parameter: args.serialize()  
});

setPixels((prevPixels) => {
  const newPixels = [...prevPixels];
  newPixels[selectedPixel.x] = [...newPixels[selectedPixel.x]];
  newPixels[selectedPixel.x][selectedPixel.y] = `#${newColor}`;
  return newPixels;
});
}
};
return (
  <Box sx={{ flexGrow: 1 }}>
    {pixels.map((row, x) => (
      <Box key={`row-${x}`} sx={{ display: 'flex' }}>
        {row.map((color, y) => (
          <div
            className="grid-item"
            key={`${x}-${y}`}
            onClick={() => handlePixelClick(x, y)}
            style={{ backgroundColor: color, width: cellSize, height: cellSize }}
          />
        ))}
      </Box>
    ))}
    {colorPickerVisible && (
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ChromePicker color={currentColor} onChange={handleColorChange} disableAlpha />
        <button onClick={handleColorPickerClose}>Save</button>
      </div>
    )}
  </Box>
);
};