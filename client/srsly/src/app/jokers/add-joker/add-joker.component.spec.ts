import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJokerComponent } from './add-joker.component';

describe('AddJokerComponent', () => {
  let component: AddJokerComponent;
  let fixture: ComponentFixture<AddJokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddJokerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
