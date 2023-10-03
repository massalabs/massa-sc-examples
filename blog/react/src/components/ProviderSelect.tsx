import { Provider } from "../const";
import { useWeb3 } from "../context/web3Context";

export const ProviderSelect = () => {
  const { providerName, initialize } = useWeb3();
  return (
    <div className="flex w-full gap-4 justify-center items-center">
      <button
        className="btn btn-primary prose"
        onClick={() => initialize(Provider.MASSASTATION)}
        disabled={providerName === Provider.MASSASTATION}
      >
        Use Massa Station
      </button>
      <button
        className="btn btn-primary"
        onClick={() => initialize(Provider.BEARBY)}
        disabled={providerName === Provider.BEARBY}
      >
        Use Bearby
      </button>
    </div>
  );
};
