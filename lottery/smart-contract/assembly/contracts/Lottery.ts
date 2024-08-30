import { Address } from '@massalabs/massa-as-sdk';
import { Args, Serializable, Result } from '@massalabs/as-types';

export class Lottery implements Serializable {
  constructor(
    public startTime: u64 = 0,
    public duration: u64 = 0, //
    public active: bool = false,
    public ticketPrice: u64 = 10, // Fix a good price
    public maxParticipants: u32 = 100,
    public participants: Address[] = [],
    public tolerance: u32 = 10,
  ) {}

  serialize(): StaticArray<u8> {
    return new Args()
      .add(this.startTime)
      .add(this.duration)
      .add(this.active)
      .add(this.ticketPrice)
      .add(this.maxParticipants)
      .addSerializableObjectArray(this.participants)
      .add(this.tolerance)
      .serialize();
  }

  deserialize(data: StaticArray<u8>, offset: i32): Result<i32> {
    const args = new Args(data, offset);

    const startTime = args.nextU64();
    if (startTime.isErr()) {
      return new Result(0, "Can't deserialize startTime.");
    }

    const duration = args.nextU64();
    if (duration.isErr()) {
      return new Result(0, "Can't deserialize duration.");
    }

    const active = args.nextBool();
    if (active.isErr()) {
      return new Result(0, "Can't deserialize active.");
    }

    const ticketPrice = args.nextU64();
    if (ticketPrice.isErr()) {
      return new Result(0, "Can't deserialize ticketPrice.");
    }

    const maxParticipants = args.nextU32();
    if (maxParticipants.isErr()) {
      return new Result(0, "Can't deserialize maxParticipants.");
    }

    const participants = args.nextSerializableObjectArray<Address>();
    if (participants.isErr()) {
      return new Result(0, "Can't deserialize participants.");
    }

    const tolerance = args.nextU32();

    this.startTime = startTime.unwrap();
    this.duration = duration.unwrap();
    this.active = active.unwrap();
    this.ticketPrice = ticketPrice.unwrap();
    this.maxParticipants = maxParticipants.unwrap();
    this.participants = participants.unwrap();
    this.tolerance = tolerance.unwrap();

    return new Result(args.offset);
  }

  add(participant: Address): void {
    // Check if the participant is already in the list

    assert(!this.participants.includes(participant), 'Already registered');
    assert(
      u32(this.participants.length) < this.maxParticipants,
      'Max participants reached',
    );

    this.participants.push(participant);
  }

  getValidityStartPeriod(): u64 {
    return this.startTime + this.duration;
  }

  getValidityEndPeriod(): u64 {
    return this.getValidityStartPeriod() + this.tolerance;
  }
}
