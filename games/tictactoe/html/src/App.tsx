import React, { useEffect, useState } from "react";
import {
  ClientFactory,
  INodeStatus,
  IAccount,
  DefaultProviderUrls,
  IDatastoreEntryInput,
  IContractStorageData,
} from "@massalabs/massa-web3";
import Args from "@massalabs/massa-web3/dist/utils/arguments";

const baseAccount = {
  publicKey: "P12f2K8YoeqZCzWASs2wktFYYGtaHGYaeSukFBrgEnw9d3J1WsMZ",
  secretKey: "S17Zw8KN3QSzsWGof7PTgkTvyGYbZLNMZmjC4urr6ZziLonThqk",
  address: "A1qZL4iJYRDRo9EtDauJuWNj56FNXWhtKinv15GEakraBa91dEA",
} as IAccount;

type TNodeStatus = INodeStatus | null;

const sc_addr = "A12egHo2xkg2s68WJzu8CofoZ9vwz2M3dYhcsxZ6PCqqXoJCST4q"

function NodeInfo() {
  const [nodeStatus, setNodeStatus] = useState<TNodeStatus>(null);

  const getNodeStatusAsync = async () => {
    try {
      let web3Client = await ClientFactory.createDefaultClient(
        DefaultProviderUrls.TESTNET,
        false,
        baseAccount
      );
      const nodeStatus: INodeStatus = await web3Client
        .publicApi()
        .getNodeStatus();
      setNodeStatus(nodeStatus);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNodeStatusAsync();
  }, []);

  const getNodeOverview = (nodeStatus?: TNodeStatus): JSX.Element => {
    if (!nodeStatus) {
      return <p>"Getting Massa's Node Status..."</p>;
    }
    return (
      <ul>
        <li>Massa Net Version: {nodeStatus?.version}</li>
        <li>Massa Net Node Id: {nodeStatus?.node_id}</li>
        <li>Massa Net Node Ip: {nodeStatus?.node_ip}</li>
        <li>Massa Net Time: {nodeStatus?.current_time}</li>
        <li>Massa Net Cycle: {nodeStatus?.current_cycle}</li>
      </ul>
    );
  };

  return getNodeOverview(nodeStatus);
}

function Square(props: any) {
  return (
    <button className="square" onClick={props.onClick} id={`square_${props.squareIndex}`}>
      {props.value}
    </button>
  );
}

function Board() {
  let [squares, setSquares] = React.useState(Array(9).fill(null));
  let [xIsNext, setXIsNext] = React.useState(true);

  useEffect(() => {
    const interval = setInterval(() => refresh(), 1000);
    return () => clearInterval(interval);
  }, []);

  function refresh() {
    ClientFactory.createDefaultClient(
      DefaultProviderUrls.TESTNET,
      false,
      baseAccount
    ).then(function (web3Client) {
      web3Client.publicApi().getDatastoreEntries([{ address: sc_addr, key: "gameState" } as IDatastoreEntryInput])
        .then(function (res: IContractStorageData[]) {
          if (res && res[0]) {
            let gameState = res[0].candidate!.split(',')

            let xIsNext = true;
            let squares = Array(9).fill(null);
            for (let vi = 0; vi < gameState.length; ++vi) {
              if (gameState[vi] === 'n') {
                squares[vi] = null;
              }
              else {
                squares[vi] = gameState[vi];
                xIsNext = !xIsNext;
              }
            }
            setSquares(squares);
            setXIsNext(xIsNext);
          }
        });
    });
  }

  function handleClick(i: number) {
    var call_params = new Args();
    call_params.addU32(BigInt(i));
    ClientFactory.createDefaultClient(
      DefaultProviderUrls.TESTNET,
      false,
      baseAccount
    ).then(function (web3Client) {
      web3Client.smartContracts().callSmartContract(
        {
          /// storage fee for taking place in books
          fee: 0,
          /// The maximum amount of gas that the execution of the contract is allowed to cost.
          maxGas: 70000000,
          /// The price per unit of gas that the caller is willing to pay for the execution.
          gasPrice: 0,
          /// Extra coins that are spent from the caller's balance and transferred to the target
          coins: 0,
          /// Target smart contract address
          targetAddress: sc_addr,
          /// Target function name. No function is called if empty.
          functionName: "play",
          /// Parameter to pass to the target function
          parameter: call_params.serialize()
        },
        baseAccount
      ).then(function (txid: any) {
        console.log("handleClick ", call_params, txid);
      });
    });
  }

  function reset() {
    ClientFactory.createDefaultClient(
      DefaultProviderUrls.TESTNET,
      false,
      baseAccount
    ).then(function (web3Client) {
      web3Client.smartContracts().callSmartContract(
        {
          /// storage fee for taking place in books
          fee: 0,
          /// The maximum amount of gas that the execution of the contract is allowed to cost.
          maxGas: 70000000,
          /// The price per unit of gas that the caller is willing to pay for the execution.
          gasPrice: 0,
          /// Extra coins that are spent from the caller's balance and transferred to the target
          coins: 0,
          /// Target smart contract address
          targetAddress: sc_addr,
          /// Target function name. No function is called if empty.
          functionName: "initialize",
          /// Parameter to pass to the target function
          parameter: ""
        },
        baseAccount
      ).then(function (txid) {
        console.log("handleClick ", "", txid);
      });
    });
  }

  function renderSquare(i: number) {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        squareIndex={i}
      />
    );
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="restart-button">
        <button onClick={() => reset()}>Restart Game</button>
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;

// From https://reactjs.org/tutorial/tutorial.html#declaring-a-winner

function calculateWinner(squares: number[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
