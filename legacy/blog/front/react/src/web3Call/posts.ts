import { Args, IClient, fromMAS } from "@massalabs/massa-web3";
import { CONTRACT_ADDRESS } from "../const";
import { Post } from "../const/post";

export const addPost = async (client: IClient, post: Post) => {
  const opId = await client.smartContracts().callSmartContract({
    fee: BigInt(0),
    maxGas: BigInt(1000000),
    coins: fromMAS(0.1),
    targetAddress: CONTRACT_ADDRESS,
    functionName: "addPost",
    parameter: new Args().addSerializable<Post>(post),
  });
  return opId;
};

export const getPosts = async (client: IClient) => {
  const resultReadOnly = await client.smartContracts().readSmartContract({
    maxGas: BigInt(4000000000),
    targetAddress: CONTRACT_ADDRESS,
    targetFunction: "getPosts",
    parameter: new Args().addI32(100000),
  });
  return resultReadOnly;
};
