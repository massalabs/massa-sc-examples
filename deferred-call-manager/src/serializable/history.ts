import {
  Args,
  IDeserializedResult,
  ISerializable,
} from '@massalabs/massa-web3';

export class History implements ISerializable<History> {
  constructor(
    public period: bigint = 0n,
    public thread: number = 0,
    public callId: string = '',
  ) {}

  serialize(): Uint8Array {
    const data = new Args()
      .addU64(this.period)
      .addU8(BigInt(this.thread))
      .addString(this.callId)
      .serialize();
    return new Uint8Array(data);
  }

  deserialize(data: Uint8Array, offset: number): IDeserializedResult<History> {
    const args = new Args(data, offset);

    this.period = args.nextU64();
    this.thread = Number(args.nextU8());
    this.callId = args.nextString();

    return { instance: this, offset: args.getOffset() };
  }
}
