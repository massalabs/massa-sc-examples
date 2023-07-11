import AccountInformation from "./accountInformation";
import ContractInteraction from "./contractInteraction";
import { ProviderService } from "../interfaces/ProviderService";
import AccountCreation from "./accountCreation";

const Body = ({
    connect,
    createAccount,
    connected,
    account,
    balance,
    errorMessage,
}: ProviderService) => (
    <div className="body">
        <div className="bodyContent">
            {!connected && (
                <>
                    <button className="bodyButton" onClick={connect}>
                        Connect to Massa Station
                    </button>
                </>
            )}
            {connected && !account && (
                <AccountCreation createAccount={createAccount} />
            )}
            {connected && account && (
                <>
                    <AccountInformation
                        accountAddress={account.address()}
                        accountName={account.name()}
                        balance={balance.finalBalance}
                    />
                    <br></br>
                    <ContractInteraction account={account} />
                </>
            )}
        </div>
        <div className="mas-h2 text-red-500">{errorMessage}</div>
    </div>
);

export default Body;
