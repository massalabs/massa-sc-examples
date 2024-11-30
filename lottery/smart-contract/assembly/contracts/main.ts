import {
  Address,
  Context,
  generateEvent,
  sendMessage,
  ConstantManager,
  unsafeRandom,
  transferCoins,
} from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';
import {
  setOwner,
  onlyOwner,
} from '@massalabs/sc-standards/assembly/contracts/utils/ownership';
import { Lottery } from './Lottery';

const LOTTERY = new ConstantManager<Lottery, u8>();
const MAX_GAS_ASYNC = 10_000_000;

export function constructor(_: StaticArray<u8>): void {
  assert(Context.isDeployingContract(), 'Contract already initialized');

  setOwner(new Args().add(Context.caller()).serialize());

  LOTTERY.set(new Lottery());
}

export function startLottery(binaryArgs: StaticArray<u8>): void {
  onlyOwner();

  assert(!LOTTERY.mustValue().active, 'Lottery already active');

  const args = new Args(binaryArgs);
  const lottery = args.nextSerializable<Lottery>().expect('Invalid lottery');
  lottery.active = true;

  // If we want delayed start we can set the start time
  if (!lottery.startTime) {
    lottery.startTime = Context.currentPeriod();
  }

  sendMessage(
    Context.callee(),
    'drawWinner',
    lottery.getValidityStartPeriod(),
    Context.currentThread(),
    lottery.getValidityEndPeriod(),
    Context.currentThread(),
    MAX_GAS_ASYNC,
    1_000_000,
    0,
    [],
  );

  generateEvent('New lottery started');
}

export function register(binaryArgs: StaticArray<u8>): void {
  const lottery = LOTTERY.mustValue();
  assert(lottery.active, 'No active lottery');
  assert(
    Context.transferredCoins() >= lottery.ticketPrice,
    'Insufficient funds for ticket',
  );

  const args = new Args(binaryArgs);
  const newParticipant = args.next<Address>().expect('No participant provided');

  lottery.add(newParticipant);

  LOTTERY.set(lottery);

  generateEvent(`Participant registered: ${newParticipant.toString()}`);
}

export function drawWinner(_: StaticArray<u8>): void {
  // Only the contract can call this function because it's a autonomous call
  assert(Context.caller() == Context.callee(), 'Invalid caller');

  const lottery = LOTTERY.mustValue();
  assert(lottery.active, 'No active lottery');

  const participants = lottery.participants;
  assert(participants.length > 0, 'No participants in the lottery');

  // Don't use unsafeRandom in production, it's not secure
  const randomIndex = u32(unsafeRandom() % participants.length);
  const winner = participants[randomIndex - 1];

  const prize = lottery.ticketPrice * participants.length;
  transferCoins(winner, prize);

  LOTTERY.set(new Lottery());

  generateEvent(
    `Lottery ended. Winner: ${winner.toString()}, Prize: ${prize.toString()}`,
  );
}

export function getLottery(_: StaticArray<u8>): StaticArray<u8> {
  return LOTTERY.mustValue().serialize();
}
