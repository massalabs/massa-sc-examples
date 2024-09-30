# Deferred Call Manager Contract

This contract manages deferred function calls, allowing functions to be scheduled for execution at a later time. It provides mechanisms to add, execute, and remove recursive task using deferred calls. The contract schedule next task execution and store the execution infos like slot and callId. Every task schedule its next execution.

## Key Functionalities

- Start a recursive task to execute every given periods.
- Executing the next deferred call and schedule the next one.
- Stop the task recursion by canceling the next planned call.

This contract is useful for scenarios where a smart contract needs to be recursively call at fixed time interval.
The execution will last until stopped or contract coins are insufficient to next execution storage or deferred call slot booking fee.

## Setup

```shell
npm i
```

Create `.env` and set `PRIVATE_KEY`:

```shell
cp .env.example .env
```

## Deploy

```shell
npm run deploy
```

## Listen to Events

```shell
npm run listen
```

## Get Execution History

```shell
npm run history
```
