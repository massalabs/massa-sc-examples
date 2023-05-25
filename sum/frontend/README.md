# Massa DApp example: Sum

This repository is a front end application for the Sum smart-contract.

Find the documentation here: <https://docs.massa.net/en/latest/web3-dev/massa-web3.html>.

This React application showcase how to build decentralized application for
<https://massa.net> with <https://github.com/massalabs/thyra>. This dapp call a
smart contract deployed on the network specified by `JSON_RPC_URL_PUBLIC` and
`JSON_RPC_URL_PRIVATE` at the hard coded address
`A1nyzu9rJKnf2zz8F7mkM5d6ZoThnMuAtUdij9WmcwXWMWJFmEB`.

Create the file `src/secrets.json` with this content:

```json
{
    "DEFAULT_WALLET_PRIVATE_KEY": "S12HCtfWg97z2LLJPPUYqwH9LBT3pGbStvgFiGg3R8ZVfRTH8YqG",
    "DEFAULT_WALLET_PUBLIC_KEY": "P12M1PMPZmPuZ7zpRMMNvKZCuwfxTr2PTxAZng7rEejJgxaZJv1L",
    "DEFAULT_WALLET_ADDRESS": "A1hNwGrSXREPAPJVMFLDNNGEcKWEUPYtpUhg1pb7D9h6QBUqn2E",
    "JSON_RPC_URL_PUBLIC": "http://127.0.0.1:33035",
    "JSON_RPC_URL_PRIVATE": "http://127.0.0.1:33034"
}
```

Run `npm run start`.

## Getting Started with Create React App

This is a React.JS application with TypeScript and Bootstrap css framework.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
