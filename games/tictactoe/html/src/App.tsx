import React, { useEffect, useState } from "react";
import {
  ClientFactory,
  INodeStatus,
  IAccount,
  DefaultProviderUrls,
} from "@massalabs/massa-web3";

const baseAccount = {
  publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
  privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
  address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM",
} as IAccount;

type TNodeStatus = INodeStatus | null;

const web3Client = ClientFactory.createDefaultClient(
  DefaultProviderUrls.LABNET,
  false,
  baseAccount
);

const sc_addr = "uponGHM3vUwVymTrjib5XGnez24FnGU1nJnyMRYXNcPwPH8ZU"

function NodeInfo() {
  const [nodeStatus, setNodeStatus] = useState<TNodeStatus>(null);

  const getNodeStatusAsync = async () => {
    try {
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

class Board extends React.Component<any, any> {
  interval: NodeJS.Timer | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.refresh(), 1000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  refresh() {
    web3Client.smartContracts().getDatastoreEntry(sc_addr, "gameState").then((res) => {
      if (res) {
        let gameState = res.candidate.split(',')

        let xIsNext = true;
        let squares = Array(9).fill(null);
        for(let vi= 0 ; vi < gameState.length ; ++vi) {
          if (gameState[vi] === 'n') {
            squares[vi] = null;
          }
          else {
            squares[vi] = gameState[vi];
            xIsNext = !xIsNext;
          }
        }
        this.setState({
          squares: squares,
          xIsNext: xIsNext,
        });
      }
    });
  }

  handleClick(i: number) {
    var call_params_str = `{"index":${i}}`

    web3Client.smartContracts().callSmartContract(
      {
          /// storage fee for taking place in books
          fee: 0,
          /// The maximum amount of gas that the execution of the contract is allowed to cost.
          maxGas: 70000000,
          /// The price per unit of gas that the caller is willing to pay for the execution.
          gasPrice: 0,
          /// Extra coins that are spent from the caller's parallel balance and transferred to the target
          parallelCoins: 0,
          /// Extra coins that are spent from the caller's sequential balance and transferred to the target
          sequentialCoins: 0,
          /// Target smart contract address
          targetAddress: sc_addr,
          /// Target function name. No function is called if empty.
          functionName: "play",
          /// Parameter to pass to the target function
          parameter: call_params_str
      },
      baseAccount
    ).then(function(txid) {
        console.log("handleClick ", call_params_str, txid);
    });
  }

  reset() {
    web3Client.smartContracts().callSmartContract(
      {
          /// storage fee for taking place in books
          fee: 0,
          /// The maximum amount of gas that the execution of the contract is allowed to cost.
          maxGas: 70000000,
          /// The price per unit of gas that the caller is willing to pay for the execution.
          gasPrice: 0,
          /// Extra coins that are spent from the caller's parallel balance and transferred to the target
          parallelCoins: 0,
          /// Extra coins that are spent from the caller's sequential balance and transferred to the target
          sequentialCoins: 0,
          /// Target smart contract address
          targetAddress: sc_addr,
          /// Target function name. No function is called if empty.
          functionName: "initialize",
          /// Parameter to pass to the target function
          parameter: ""
      },
      baseAccount
    ).then(function(txid) {
        console.log("handleClick ", "", txid);
    });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        squareIndex={i}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="restart-button">
        <button onClick={() => this.reset()}>Restart Game</button>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="node-info">
          <NodeInfo />
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
