import { Args, Result, Serializable } from '@massalabs/as-types';

export class Post implements Serializable {
  constructor(
    public title: string = '',
    public author: string = '',
    public date: string = '',
    public tags: string = '',
    public content: string = '',
  ) {}

  serialize(): StaticArray<u8> {
    return new Args()
      .add(this.title)
      .add(this.author)
      .add(this.date)
      .add(this.tags)
      .add(this.content)
      .serialize();
  }
  deserialize(data: StaticArray<u8>, offset: i32): Result<i32> {
    const args = new Args(data, offset);
    const title = args.nextString();
    const author = args.nextString();
    const date = args.nextString();
    const tags = args.nextString();
    const content = args.nextString();

    if (title.isErr()) {
      return new Result(0, "Can't deserialize Title.");
    }
    if (author.isErr()) {
      return new Result(0, "Can't deserialize Author.");
    }
    if (date.isErr()) {
      return new Result(0, "Can't deserialize Date.");
    }
    if (tags.isErr()) {
      return new Result(0, "Can't deserialize Tags.");
    }
    if (content.isErr()) {
      return new Result(0, "Can't deserialize Content.");
    }

    if (title.unwrap().length > 50) {
      return new Result(0, 'Title is too long.');
    }
    if (author.unwrap().length > 50) {
      return new Result(0, 'Author is too long.');
    }
    if (date.unwrap().length > 50) {
      return new Result(0, 'Date is too long.');
    }
    if (tags.unwrap().length > 50) {
      return new Result(0, 'Tags is too long.');
    }
    if (content.unwrap().length > 300) {
      return new Result(0, 'Content is too long.');
    }

    this.title = title.unwrap();
    this.author = author.unwrap();
    this.date = date.unwrap();
    this.tags = tags.unwrap();
    this.content = content.unwrap();

    return new Result(args.offset);
  }
}
