import {
  ISerializable,
  Args,
  IDeserializedResult,
} from "@massalabs/massa-web3";

export class Post implements ISerializable<Post> {
  constructor(
    public title: string = "",
    public author: string = "",
    public date: string = "",
    public tags: string = "",
    public content: string = ""
  ) {
    if (title.length > 50) {
      throw new Error("Title is too long.");
    }
    if (author.length > 50) {
      throw new Error("Author is too long.");
    }
    if (date.length > 50) {
      throw new Error("Date is too long.");
    }
    if (tags.length > 50) {
      throw new Error("Tags is too long.");
    }
    if (content.length > 300) {
      throw new Error("Content is too long.");
    }
  }

  serialize(): Uint8Array {
    const args = new Args()
      .addString(this.title)
      .addString(this.author)
      .addString(this.date)
      .addString(this.tags)
      .addString(this.content);

    return new Uint8Array(args.serialize());
  }
  deserialize(data: Uint8Array, offset: number): IDeserializedResult<Post> {
    const args = new Args(data, offset);

    this.title = args.nextString();
    this.author = args.nextString();
    this.date = args.nextString();
    this.tags = args.nextString();
    this.content = args.nextString();

    return { instance: this, offset: args.getOffset() };
  }
}
