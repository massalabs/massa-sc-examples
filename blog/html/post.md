# An Introduction to Massa

**Current blockchains that scale to high transaction throughputs are either centralized or unsafe.**

For Massa, we designed a new architecture, called the Blockclique, that scales transaction throughput up to 10,000 transactions per second without sacrificing decentralization nor security. Our architecture is based on transaction sharding in a multithreaded block graph. In this blog post we introduce the main concepts of the Blockclique. You can also dive into the technical paper or interact with the live testnet at massa.net/testnet. We look forward to hearing your feedback!

**TL; DR**

- We combine transaction sharding and a multithreaded block graph architecture allowing parallel blocks with compatible transactions
- We extend the Nakamoto consensus rule to the case of parallel blocks, allowing a secure and decentralized consensus using Proof-of-Stake
- The Blockclique architecture can handle thousands of transactions per second, on par with traditional financial systems

## We’ve had a scaling problem

Current blockchains do not scale. In order to become viable alternatives to classical financial solutions, blockchains should be able to handle a number of transactions similar to that of classical systems. Currently, Bitcoin allows for only 5 transactions per second (tx/s) in the whole network while Ethereum allows for 15–20 tx/s. These number are nowhere near those of classical financial systems. For instance, the VISA system processed 111 billion transactions in 2017 (an average of 3500 tx/s). As a result, blockchains can easily get congested as evidenced by the Cryptokitties hype.

### Why? Data structure and Nakamoto consensus rule

The limitations of blockchains stems from their very design. A blockchain is defined as the “best” chain of a block tree, where each block references one parent block in the tree in addition to carrying a set of transactions.

When a node creates a block, it broadcasts the block to other nodes of a peer-to-peer network, which in turn relay it to other nodes, and so on until most nodes are aware of the block. This process takes time, especially if the blocks are big. At a given moment, different nodes may therefore be aware of different subsets of created blocks. As a result, two nodes may broadcast two blocks with the same parent block, even if they are honest. This is called a fork, and it gives rise to two alternative chains of blocks originating from the same ancestor block.

Because alternative chains can contain different, incompatible sets of transactions, nodes need to agree on a single common chain to achieve consensus on executed transactions. An elegant way of achieving consensus in a decentralized network is known as the Nakamoto consensus rule. From the point of view of a node, the idea is to rate each chain of the block tree by assigning it a scalar fitness, and to only produce new blocks by extending the chain of maximum fitness. The chain of maximum fitness is the one referred to as the “blockchain”: only transactions that appear in blocks of the blockchain are considered executed.

In order to prevent Sybil attacks, the fitness should represent something hard to create or obtain: a resource. In Proof-of-Work systems such as Bitcoin, the fitness of a chain is defined as the total computational work performed to create all its blocks. In Proof-of-Stake systems such as Tezos, the fitness of a chain is linked to the total number of coins that were put at stake in the blocks of the chain. Nakamoto is the most widely used consensus rule for decentralized blockchains, however many other consensus mechanisms have been implemented. To dig into consensus mechanisms, we recommend to start here or there.

The Nakamoto consensus rule smoothly keeps nodes focused on a single common blockchain as long as the rate at which forks happen remains reasonable. A small block size that fits few transactions, and a low block frequency (1 MB every 10 minutes on average in Bitcoin) ensure that most of the time, a block can be broadcast to the whole network before another one is created. Thus, the fork rate is low and consensus is easy, but the average number of transactions processed per second is limited.

### Pushing the limits?

The number of tx/s can be increased in a naive way either by increasing the block frequency (the rate at which blocks are created) or by increasing the block size to fit more transactions per block. However this is only possible to a small extent.

If the block frequency is increased too much (say one block of 1 MB per second), blocks have little time to propagate in the network before another block is found: nodes create many incompatible blocks, leading to a high fork rate and consensus failure. If instead the block size is increased too much (say to 1 GB), block broadcasting become too slow, the fork rate becomes high, and consensus fails as well.

This problem is illustrated in the video below, in which we simulate a network of nodes discovering blocks in a Proof-of-Work setting.

Several cryptocurrencies have increased the number of transactions per second by changing the block size or block frequency. For example, Bitcoin Cash increased the block size by a factor of 8, increasing the number of transactions per second by the same amount. However this number remains quite low. In order to increase significantly the number of transactions processed it is thus necessary to rely on other approaches.

### Restricting the network size?

One way of lowering the time needed to transfer blocks in a network is to limit the network size. For example in EOS, only 21 authorized block producers are allowed to process transactions, which yields about 3000–4000 tx/s. In Ripple, a single company decides who can become a validator and produce blocks, so that the protocol can reach about 1500 tx/s.

However, restricting the network size is incompatible with the idea of an open decentralized network in which any node can participate without permission. As Ethereum developers coined it, there seems to be a scalability trilemma in current blockchain architectures: a tradeoff between decentralization, scalability and security.

The real challenge is thus to design a blockchain capable of handling thousands of transactions while remaining completely decentralized and secure, allowing thousands of nodes to participate in block production and consensus.

Changing the data structure and consensus rules?
Recently, there has been several attempts at scaling decentralized currencies through changes in data structure and consensus rules. One line of work implements transaction sharding, which consists in distributing transactions into several groups (“shards”) that can be processed in parallel, such as in Elastico or Zilliqa. However, in these protocols, nodes processing different shards have to regularly agree on a common blockchain, which limits the parallelism benefits of sharding.

Another line of work seeks to extend the block tree structure into a block graph structure by allowing blocks to have more than one parent. The first directed acyclic block graph (block DAG) structures are described in [Lewenberg, 2015], [Sompolinsky, 2015] and [Sompolinsky, 2016]. In those protocols however, transactions from one block can be incompatible with transactions from another parallel block because the transactions themselves are not sharded. An extra voting process is required to order transactions and choose which ones are executed.

## The blockclique solution used in Massa

Blockclique is a new architecture combining transaction sharding and a multithreaded block DAG. It solves the scalability issue by parallelizing the data structure and adapting the consensus rule.

### Blockclique data structure and consensus rule

In the Blockclique architecture, blocks can be created in a fixed number of threads. A block created in a specific thread references a parent block in each of the threads. The resulting data structure is a multithreaded directed acyclic graph of blocks (multithreaded DAG).

However, an address could attempt to spend the same coins twice by executing transactions in two parallel threads at the same time. Blockclique prevents such double-spending by allowing a given address to spend coins only in a specific thread (defined by the first bits of the address). Blocks from a given thread therefore only contain transactions with input addresses belonging to that thread. This process is known as transaction sharding. Still, a transaction output can be any address, regardless of the thread of the input addresses.

**A unique property emerges from this combination of transaction sharding and block DAG: nodes can create blocks in parallel whose enclosed transactions are compatible by construction.**

In this new block structure, nodes can still create forks in particular threads by creating two incompatible blocks in the same thread with the same parent in that thread. We thus extend the Nakamoto rule to allow nodes to reach a consensus about the global set of compatible blocks (called “clique”) of maximum fitness. This consensus rule ensures that each thread behaves like a normal blockchain and that blocks found in one thread also take into account earlier blocks in other threads, while allowing slight desynchronizations between threads.

In contrast to previous blockchains based on a DAG architecture, the multithreaded block DAG with transaction sharding and an adapted consensus rule allows to fully benefit from block parallelization and does not require giving special privileges to some nodes.

### Simulation results

We tested our ideas through simulations, that we open-sourced here. Using network parameters similar to the ones found in Ethereum (average upload bandwidth of 32 Mb/s and average latency of 100 ms, thousands of nodes), we showed that by using 32 parallel threads and a Proof-of-Stake Sybil-resistance mechanism, our architecture can withstand up to 10,000 tx/s with transaction confirmation times in the order of 40s!

*This improvement can be understood as follows:*

- in standard blockchains nodes must have the latest block to start working on the next block (otherwise they would create a fork)
- in Blockclique, it is not necessary to have all the latest blocks to work on a new one. Nodes create blocks in parallel threads without leading to a fork.
- the Blockclique architecture ensures the sequential consistency of coin debits for each address, while allowing coin credits to be slightly de-synchronized

Of course there is much more to these results. We tested a large set of parameters, showed that our architecture is resilient to different kinds of attacks and even proposed improvements to existing consensus schemes. We encourage you to read the technical paper if you are interested in more details!

### Give it a try!

Our testnet is live! On test.massa.net, you will see the created blocks in real time.
On this explorer, you can also interact with the testnet by creating a wallet and receiving or sending coins.
If you have a computer with reliable internet, please run a node! You can follow the steps on our Github.

## Conclusion

We have shown that it is possible to solve the scaling issue of blockchains using transaction sharding in a multithreaded block graph. Massa reaches thousands of transactions per second without jeopardizing the decentralization nor the security of the blockchain. One thing that we did not mention is that our architecture is compatible with smart-contracts that can be implemented within one thread or adapted to support multithreading.

We believe that Massa can fulfill the promises of a scalable, secure and truly decentralized blockchain. We hope that you are as excited as we are and we’d love to hear your feedback! Please come to our Telegram, Discord or Reddit to give your thoughts!