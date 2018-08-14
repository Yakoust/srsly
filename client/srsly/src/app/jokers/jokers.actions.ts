import { Action } from '@ngrx/store';
import { Joke, Joker } from '../core/joker-api/jokers.model';

export const FIND_ALL_JOKERS = '[Jokers] find all jokers';
export const FIND_ALL_JOKERS_SUCCESS = '[Jokers] find all jokers success';
export const ADD_NEW_JOKER = '[Jokers] add jokers';
export const ADD_NEW_JOKE = '[Jokers] add joker';

export class FindAllJokersAction implements Action {
  readonly type = FIND_ALL_JOKERS;
}

export class FindAllJokersSuccessAction implements Action {
  readonly type = FIND_ALL_JOKERS_SUCCESS;

  constructor(public jokers: Joker[]) {}
}

export class AddJokerAction implements Action {
  readonly type = ADD_NEW_JOKER;

  constructor(public name: string) {}
}

export class AddJokeAction implements Action {
  readonly type = ADD_NEW_JOKE;

  constructor(public idJoker: string, public joke: Joke) {}
}

export type All = FindAllJokersAction | FindAllJokersSuccessAction | AddJokerAction | AddJokeAction;
