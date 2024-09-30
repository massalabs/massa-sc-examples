import { Args, Result, Serializable } from '@massalabs/as-types';

export class History implements Serializable {
  constructor(
    public period: u64 = 0,
    public thread: u8 = 0,
    public callId: string = '',
  ) {}

  serialize(): StaticArray<u8> {
    return new Args()
      .add(this.period)
      .add(this.thread)
      .add(this.callId)
      .serialize();
  }

  deserialize(data: StaticArray<u8>, offset: i32): Result<i32> {
    const args = new Args(data, offset);

    this.period = args.nextU64().expect("Can't deserialize period.");
    this.thread = args.nextU8().expect("Can't deserialize thread.");
    this.callId = args.nextString().expect("Can't deserialize callId.");

    return new Result(args.offset);
  }
}
