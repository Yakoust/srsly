import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJokerComponent } from './add-joker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import * as fromJokers from '../jokers.reducer';
import { metaReducers, reducers, State } from '../../reducers';
import { DebugElement } from '@angular/core';
import { RouterNavigateAction } from '@davinkevin/router-store-helper';
import { AddJokerAction } from '../jokers.actions';

describe('AddJokerComponent', () => {
  let component: AddJokerComponent;
  let fixture: ComponentFixture<AddJokerComponent>;
  let elem: DebugElement;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        StoreModule.forFeature('jokers', fromJokers.reducer),
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      declarations: [AddJokerComponent],
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(AddJokerComponent);
    component = fixture.componentInstance;
    elem = fixture.debugElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to jokers when clicking on back button', done => {
    /* GIVEN */
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const backButton = elem.query(By.css('.back'));
        /* WHEN */
        backButton.triggerEventHandler('click', null);
        /* THEN */
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => expect(store.dispatch).toHaveBeenCalledWith(new RouterNavigateAction(['jokers'])))
      .then(done)
      .catch(done.fail);
  });

  it('should have add button disabled', done => {
    /* GIVEN */
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const addButton = elem.query(By.css('form button'));
        /* THEN */
        expect(addButton.properties['disabled']).toBe(true);
      })
      .then(done)
      .catch(done.fail);
  });
  it('should send add joker request when field filled and add clicked', done => {
    /* GIVEN */
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const input = elem.query(By.css('input[matInput]'));
        input.triggerEventHandler('input', { target: { value: 'newJoker' } });
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const addButton = elem.query(By.css('form button'));
        /* THEN */
        addButton.nativeElement.click();

        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        expect(store.dispatch).toHaveBeenCalledWith(new AddJokerAction('newJoker'));
      })
      .then(done)
      .catch(done.fail);
  });
});
