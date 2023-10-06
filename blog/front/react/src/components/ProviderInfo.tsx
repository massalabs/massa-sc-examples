import { useWeb3 } from "../context/web3Context";

export const ProviderInfo = () => {
  const { providerName, providerAddress } = useWeb3();

  return (
    <div className="flex flex-col justify-center items-center p-4 text-left ">
      <div className="flex flex-col justify-start items-start">
        <h3 id="address">
          <span className=" font-bold">Your address: </span>
          {providerAddress}
        </h3>
        <h3 id="address">
          <span className=" font-bold">Provider: </span>
          {providerName}
        </h3>
      </div>
    </div>
  );
};
