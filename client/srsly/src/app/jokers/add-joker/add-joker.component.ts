import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddNewJokerAction } from '../jokers.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../../reducers';
import { RouterNavigateAction } from '@davinkevin/router-store-helper';

@Component({
  selector: 'srsly-add-joker',
  templateUrl: './add-joker.component.html',
  styleUrls: ['./add-joker.component.scss'],
})
export class AddJokerComponent implements OnInit {
  jokerForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private store: Store<State>, private fb: FormBuilder) {}

  ngOnInit() {}

  goBack() {
    this.store.dispatch(new RouterNavigateAction(['jokers']));
  }
  add() {
    this.store.dispatch(new AddNewJokerAction(this.jokerForm.get('name').value));
  }
}
