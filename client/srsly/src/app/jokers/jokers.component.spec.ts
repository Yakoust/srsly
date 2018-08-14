import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { JokersComponent } from './jokers.component';
import { MatIconModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { OrderByNbJokePipe } from '../core/pipes/order-by-nb-joke.pipe';
import { Action, Store, StoreModule } from '@ngrx/store';
import * as fromJokers from './jokers.reducer';
import { metaReducers, reducers, State } from '../reducers';
import { AddJokeAction, AddJokerAction, FindAllJokersAction, FindAllJokersSuccessAction } from './jokers.actions';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Joker } from '../core/joker-api/jokers.model';
import { RouterNavigateAction } from '@davinkevin/router-store-helper';
import { JokersEffects } from './jokers.effects';
import { JokersApiService } from '../core/joker-api/jokers-api.service';
import Spy = jasmine.Spy;
import { of, ReplaySubject, Subscription } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const jokers: Joker[] = [
  {
    name: 'toto',
    _id: '1',
    jokes: [{ joke: 'toto', context: 'la', date: new Date() }],
  },
  {
    name: 'titi',
    _id: '2',
    jokes: [{ joke: 'toto', context: 'la', date: new Date() }, { joke: 'toto', context: 'la', date: new Date() }],
  },
];

describe('JokersComponent', () => {
  let component: JokersComponent;
  let fixture: ComponentFixture<JokersComponent>;
  let elem: DebugElement;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatProgressSpinnerModule,
        MatListModule,
        SatPopoverModule,
        StoreModule.forFeature('jokers', fromJokers.reducer),
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      declarations: [JokersComponent, OrderByNbJokePipe],
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();
    fixture = TestBed.createComponent(JokersComponent);
    component = fixture.componentInstance;
    elem = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(new FindAllJokersAction());
  });

  it('should display spinner', () => {
    const spinner = elem.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should display spinner', done => {
    store.dispatch(new FindAllJokersSuccessAction(jokers));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const spinner = elem.query(By.css('mat-spinner'));
        expect(spinner).not.toBeTruthy();
      })
      .then(done)
      .catch(done.fail);
  });

  it('should navigate to add joker when clicking on add button', done => {
    store.dispatch(new FindAllJokersSuccessAction(jokers));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const addJokerButton = elem.query(By.css('.add-joker'));
        addJokerButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => expect(store.dispatch(new RouterNavigateAction(['jokers/add']))))
      .then(done)
      .catch(done.fail);
  });

  it('should display two line in list', done => {
    store.dispatch(new FindAllJokersSuccessAction(jokers));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const jokerLines = elem.queryAll(By.css('mat-list-item'));
        expect(jokerLines.length).toBe(2);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should display button to add joke to joker', done => {
    store.dispatch(new FindAllJokersSuccessAction(jokers));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const addJokeBtn = elem.query(By.css('mat-list-item button'));
        addJokeBtn.triggerEventHandler('click', null);
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => expect(store.dispatch(new RouterNavigateAction(['jokers/1/add']))))
      .then(done)
      .catch(done.fail);
  });

  it('should display jokers names order by nb jokes', done => {
    store.dispatch(new FindAllJokersSuccessAction(jokers));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const names = elem.queryAll(By.css('mat-list-item h4.joker-name'));
        expect(names[0].nativeElement.innerText).toBe('titi');
        expect(names[1].nativeElement.innerText).toBe('toto');
      })
      .then(done)
      .catch(done.fail);
  });

  it('should display as many joke emoji as joker jokes', done => {
    store.dispatch(new FindAllJokersSuccessAction(jokers));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const jokesOfFirstJoker = elem.queryAll(By.css('mat-list-item:nth-of-type(1) div span span'));
        const jokesOfSecondJoker = elem.queryAll(By.css('mat-list-item:nth-of-type(2) div span span'));
        expect(jokesOfFirstJoker.length).toBe(2);
        expect(jokesOfSecondJoker.length).toBe(1);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should display popover on hover joke', done => {
    store.dispatch(new FindAllJokersSuccessAction(jokers));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const firstJokesOfFirstJoker = elem.query(By.css('mat-list-item:nth-of-type(1) div span span'));
        firstJokesOfFirstJoker.triggerEventHandler('mouseover', null);
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const popover = elem.query(By.css('sat-popover'));
        expect(popover).toBeTruthy();
      })
      .then(done)
      .catch(done.fail);
  });
});

describe('JokersComponent effects', () => {
  let actions;
  let service: JokersApiService;
  let jokersEffects: JokersEffects;
  let store: Store<State>;

  beforeEach(done => {
    service = jasmine.createSpyObj('service', ['findAllJokers', 'addJoker', 'addJoke']);
    (service.findAllJokers as Spy).and.returnValue(of(jokers));
    (service.addJoker as Spy).and.returnValue(of('added'));
    (service.addJoke as Spy).and.returnValue(of('added'));
    actions = jasmine.createSpyObj('actions', ['ofType']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forFeature('jokers', fromJokers.reducer),
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      providers: [
        JokersEffects,
        provideMockActions(() => actions),
        {
          provide: JokersApiService,
          useValue: service,
        },
      ],
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();

    jokersEffects = TestBed.get(JokersEffects);
    done();
  });

  it('should launch RouterNavigateAction when AddJokerAction', () => {
    actions = hot('--a-', { a: new AddJokerAction('joker') });
    const expected = cold('--b-', { b: new RouterNavigateAction(['jokers']) });
    /*THEN*/
    expect(jokersEffects.addJoker$).toBeObservable(expected);
  });

  it('should launch RouterNavigateAction when AddJokeAction', () => {
    actions = hot('--a-', { a: new AddJokeAction('id', { joke: 'joke', context: 'context', date: new Date() }) });
    const expected = cold('--b-', { b: new RouterNavigateAction(['jokers']) });
    /*THEN*/
    expect(jokersEffects.addJoke$).toBeObservable(expected);
  });

  it('should redirect to jokers page after waiting 1500ms when FindAllJokersAction is launched', fakeAsync(() => {
    actions = new ReplaySubject<Action>(1);
    const subscription = jokersEffects.loadJokers$.subscribe(ev => {
      expect(ev).toEqual(new FindAllJokersSuccessAction(jokers));
      subscription.unsubscribe();
    });
    actions.next(new FindAllJokersAction());
    tick(15000);
    discardPeriodicTasks();
  }));
});
