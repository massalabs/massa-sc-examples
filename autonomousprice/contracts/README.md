## autonomousprice smart contract

A simple use case autonomous SC usage.
This smart contract is used to provide a simulated price autonomousprice.
Two main function are exposed: setPrice and getPrice.

getPrice can be called by other SC to fetch the current price.
setPrice access is restricted to be called by itself through an autonomous SC.
In a real world, `setPrice` could be called by an autonomousprice operator (for instance Chainlink).

In this example, the price will randomly move between -5% and +5% at each periods.

Once deployed, the contract will recursively call the setPrice function and move the price of the asset.

The deployer script contains an infinite loop which is listening emitted events.
