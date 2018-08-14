export interface Joke {
  id: string;
  joke: string;
  context: string;
  date: Date;
}

export interface Joker {
  _id: string;
  name: string;
  jokes?: Joke[];
}
