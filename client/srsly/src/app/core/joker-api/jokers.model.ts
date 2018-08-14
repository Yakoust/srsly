export interface Joke {
  joke: string;
  context: string;
  date: Date;
}

export interface Joker {
  _id: string;
  name: string;
  jokes?: Joke[];
}
