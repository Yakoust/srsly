import { Component, OnInit } from '@angular/core';
import { Joker } from '../core/joker-api/jokers.model';
import { selectIsLoading, selectJokers } from './jokers.reducer';
import { Store } from '@ngrx/store';
import { FindAllJokersAction } from './jokers.actions';
import { State } from '../reducers';
import { RouterNavigateAction } from '@davinkevin/router-store-helper';

@Component({
  selector: 'srsly-jokers',
  templateUrl: './jokers.component.html',
  styleUrls: ['./jokers.component.scss'],
})
export class JokersComponent implements OnInit {
  jokers: Joker[] = [];
  isLoading = false;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new FindAllJokersAction());
    this.store.select(selectJokers).subscribe(jokers => (this.jokers = jokers));
    this.store.select(selectIsLoading).subscribe(isLoading => (this.isLoading = isLoading));
  }

  goToAddJoke(id: string) {
    console.log(id)
    this.store.dispatch(new RouterNavigateAction([`jokers/${id}/add`]));
  }

  goToAddJoker() {
    this.store.dispatch(new RouterNavigateAction(['jokers/add']));
  }
}
