import React, { useState } from 'react';
import ContractInteraction from './contractInteraction';
import { providers, ThyraAccount } from '@massalabs/wallet-provider';


// setup a new provider: MassaStation (THYRA)
const registerEvent = new CustomEvent('register', { detail: { providerName: 'THYRA' } });
document.getElementById('massaWalletProvider').dispatchEvent(registerEvent);

const provider = providers()[0]; // this is a thyraProvider object

// get all the accounts and returns them in an array
async function getAllAccounts() {
  // empty the message
  document.getElementsByClassName("messageToDisplay")[0].innerHTML = "";

  // get the accounts from the wallet plugin
  const url = MASSA_STATION_WALLET_URL + "api/accounts";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

export default function Body() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  function createAccount() {
    // empty the message
    try{
        document.getElementsByClassName("messageToDisplay")[0].innerHTML = "";
    }
    catch(error) {
        console.log(error);
    }


    try{
        // get all the accounts
        const accounts = await provider.accounts();
        return accounts;
    }
    catch(error) {
        console.log("Error while retrieving accounts: ", error);
        document.getElementsByClassName("messageToDisplay")[0].innerHTML = "Error while retrieving accounts: " + error;
        return [];
    }

}

// account is a ThyraAccount object
function getBalance(account) {
    try{
        let balance = 0;
        (async () => {
            balance = await account.balance();
        })();
        return balance;
    }
    catch(error) {
        console.log("Error while retrieving balance: ", error);
        return 0;
    }
}

// check if Massa Station is running with the wallet plugin
async function isMassaStationRunning() {
    try{
        const isRunning = await getAllAccounts();
        return true;
    }
    catch(error) {
        return false;
    }
}


export default function Body() {
    const [connected, setConnected] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [accountAddress, setAccountAddress] = useState('');
    const [balance, setBalance] = useState(-1);

    async function createAccount() {
        // empty the message
        document.getElementsByClassName("messageToDisplay")[0].innerHTML = "";
        
        try{
            // create an account
            const newAccountData = await provider.generateNewAccount(document.getElementsByClassName("input")[0].value);
            console.log("new account created: ", newAccountData);
            setAccountAddress(newAccountData._address);
            setAccountName(newAccountData._name);
            const acc = new ThyraAccount({ address: accountAddress, name: accountName }, provider.providerName)
            setBalance(getBalance(acc));
        }
        catch(error) {
            console.log(error);
            document.getElementsByClassName("messageToDisplay")[0].innerHTML = error;
            return;
        }
    }

    function onMSDisconnected(message) {
        setConnected(false);
        console.log("Disconnected from Massa Station");
        // replace className MSDisconnected with message
        document.getElementsByClassName("messageToDisplay")[0].innerHTML = message;
                
    }
    
    function onMSConnected() {
        console.log("Connected to Massa Station");
        setConnected(true);
        // set the account
        getAllAccounts().then(data => {
            if(data.length > 0) {
                setAccountAddress(data[0]._address);
                setAccountName(data[0]._name);
                // set the balance
                const acc = new ThyraAccount({ address: data[0]._address, name: data[0]._name }, provider.providerName);
                setBalance(getBalance(acc));
            }
            else {
                setAccountAddress("No account found");
                setAccountName("No account found");
                setBalance("0");                
            }
        }
        );
    }

  function onMSDisconnected(message) {
    setConnected(false);
    console.log("Disconnected from Massa Station");
    // replace className MSDisconnected with message
    document.getElementsByClassName("messageToDisplay")[0].innerHTML = message;
  }

    // check if Massa Station is running with the wallet plugin
    function connectMassaStation() {
        // check if Massa Station is running with the wallet plugin
        (async () => {
            const isRunning = await isMassaStationRunning()
            if(isRunning) {
                onMSConnected();
            }
            else {
                onMSDisconnected("Massa Station is not running or the wallet plugin is not installed.");
            }
        })();

    }

    let displayBalance = "Balance : " + balance + " MASSA"

    return (
        <div className="body">
            {/* Title and quick presentation of the smart contract related to this front end */}
            <h1 className='bodyTitle'>Sum calculator</h1>
            <p className='bodyText'>This is a simple calculator that adds two numbers together.</p>

            <div className='bodyContent'>
                {!connected && 
                    <button className='bodyButton' onClick={connectMassaStation}>Connect to Massa Station</button>
                }
                { connected && accountAddress === 'No account found' &&
                    <div>
                        <br></br>
                        <p className="address">No account found. Create an account by clicking the button below. 
                        <br></br>
                        <input type="text" className="input" placeholder="Account's name"></input>
                        <button className='bodyButton' onClick={createAccount}>Create account</button>
                        </p>
                    </div>
                }
                { connected && accountAddress !== 'No account found' &&
                    <div>
                        <div className='accountInfo'>
                            <br></br>
                            <p className="address">
                                Account : <a className='addressLink' href={"https://massa.net/testnet/"+accountAddress}>{accountAddress.substring(0,6) + ' ... ' + accountAddress.substring(accountAddress.length -5, accountAddress.length)}</a>
                            </p>
                            <p className="balance">{displayBalance}</p>
                        </div>
                        <br></br>
                        <ContractInteraction />
                    </div>
                }
            </div>
            <div className="messageToDisplay"></div>
        </div>
    );
}
