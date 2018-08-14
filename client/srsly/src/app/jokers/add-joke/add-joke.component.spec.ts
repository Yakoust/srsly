import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddJokeComponent } from './add-joke.component';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers, State } from '../../reducers';
import * as fromJokers from '../jokers.reducer';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterNavigateAction } from '@davinkevin/router-store-helper';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { AddJokeAction } from '../jokers.actions';

const fakeRoutes = [
  {
    path: 'jokers/:id/add',
    component: AddJokeComponent,
  },
];

describe('AddJokeComponent', () => {
  let component: AddJokeComponent;
  let fixture: ComponentFixture<AddJokeComponent>;
  let elem: DebugElement;
  let store: Store<State>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddJokeComponent],
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
        RouterTestingModule.withRoutes(fakeRoutes),
        StoreModule.forFeature('jokers', fromJokers.reducer),
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
          },
        },
      ],
    }).compileComponents();

    router = TestBed.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(AddJokeComponent);
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

  it('should send add joke request when fields filled and add clicked', done => {
    /* GIVEN */

    jasmine.clock().uninstall();
    jasmine.clock().install();
    const baseTime = new Date();
    jasmine.clock().mockDate(baseTime);

    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const inputs = elem.queryAll(By.css('textarea[matInput]'));
        inputs[0].triggerEventHandler('input', { target: { value: 'newJoke' } });
        inputs[1].triggerEventHandler('input', { target: { value: 'newContext' } });
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
        expect(store.dispatch).toHaveBeenCalledWith(
          new AddJokeAction('123', { joke: 'newJoke', context: 'newContext', date: baseTime })
        );
        jasmine.clock().uninstall();
      })
      .then(done)
      .catch(done.fail);
  });
});
