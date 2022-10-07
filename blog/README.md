# Decentralized blog

This is a sample that shows how Massa's decentralized web can be used to create a decentralised blog platform.

It is not intended as a production quality blog platform.

If you want to deploy this demo you should first compile and deploy the `main.ts` smart-contract found in the `smart-contract` folder.
Once you have the address of the deployed smart-contract you should edit the [`main.js`](https://github.com/massalabs/massa-sc-examples/tree/main/blog/html/main.js) file in the `html` folder and put the address of your smart-contract: `const blog_sc_address = <your_smart-contract_address>`. If you are trying on a custom network you can also change the `rpc_url`.

## Smart-contract (backend)

- [`smart-contract.ts`](https://github.com/massalabs/massa-sc-examples/blob/main/blog/smart-contract/src/smart-contract.ts) contains the smart-contract logic of the blog.

## Front

- [`html`](https://github.com/massalabs/massa-sc-examples/tree/main/blog/html) contains the front.
