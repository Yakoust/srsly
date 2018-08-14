import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../../reducers';
import { Store } from '@ngrx/store';
import { RouterNavigateAction } from '@davinkevin/router-store-helper';
import { ActivatedRoute } from '@angular/router';
import { AddJokeAction } from '../jokers.actions';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'srsly-add-joke',
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.scss'],
})
export class AddJokeComponent implements OnInit {
  jokerId: string;
  jokeForm = this.fb.group({
    joke: ['', Validators.required],
    context: ['', Validators.required],
  });

  constructor(private store: Store<State>, public fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.jokerId = params['id'];
    });
  }

  goBack() {
    this.store.dispatch(new RouterNavigateAction(['jokers']));
  }

  add() {
    this.store.dispatch(
      new AddJokeAction(this.jokerId, {
        joke: this.jokeForm.get('joke').value,
        context: this.jokeForm.get('context').value,
        date: new Date(),
      })
    );
  }
}
