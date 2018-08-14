import { Injectable } from '@angular/core';
import {
  FindAllJokersSuccessAction,
  FIND_ALL_JOKERS,
  ADD_NEW_JOKER,
  AddNewJokerAction,
  AddJokeAction,
  ADD_NEW_JOKE,
} from './jokers.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/internal/operators';
import { JokersApiService } from '../core/joker-api/jokers-api.service';
import { RouterNavigateAction } from '@davinkevin/router-store-helper';
import { timer } from 'rxjs';

@Injectable()
export class JokersEffects {
  @Effect()
  loadJokers$ = this.actions$.pipe(
    ofType(FIND_ALL_JOKERS),
    switchMap(() =>
      timer(1500).pipe(
        switchMap(() => this.jokersService.getAllJokers()),
        map(jokers => new FindAllJokersSuccessAction(jokers))
      )
    )
  );

  @Effect()
  addJoker$ = this.actions$.pipe(
    ofType(ADD_NEW_JOKER),
    map((action: AddNewJokerAction) => action.name),
    switchMap(name => this.jokersService.addJoker(name)),
    map(() => new RouterNavigateAction(['/jokers']))
  );

  @Effect()
  addHJoke$ = this.actions$.pipe(
    ofType(ADD_NEW_JOKE),
    switchMap((action: AddJokeAction) => this.jokersService.addJoke(action.idJoker, action.joke)),
    map(() => new RouterNavigateAction(['jokers']))
  );

  constructor(private actions$: Actions, private jokersService: JokersApiService) {}
}
