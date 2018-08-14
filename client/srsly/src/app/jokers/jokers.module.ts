import { NgModule } from '@angular/core';
import { JokersComponent } from './jokers.component';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { JokersApiService } from '../core/joker-api/jokers-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { JokersEffects } from './jokers.effects';
import * as fromJokers from './jokers.reducer';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AddJokerComponent } from './add-joker/add-joker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddJokeComponent } from './add-joke/add-joke.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import {OrderByNbJokePipe} from '../core/pipes/order-by-nb-joke.pipe';

const jokersRoutes: Routes = [
  {
    path: 'jokers',
    component: JokersComponent,
  },
  {
    path: 'jokers/add',
    component: AddJokerComponent,
  },
  {
    path: 'jokers/:id/add',
    component: AddJokeComponent,
  },
];

@NgModule({
  declarations: [JokersComponent, AddJokerComponent, AddJokeComponent, OrderByNbJokePipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    SatPopoverModule,
    ReactiveFormsModule,
    MatInputModule,
    StoreModule.forFeature('router', routerReducer),
    StoreModule.forFeature('jokers', fromJokers.reducer),
    EffectsModule.forFeature([JokersEffects]),
    RouterModule.forChild(jokersRoutes),
  ],
  providers: [JokersApiService, OrderByNbJokePipe],
})
export class JokersModule {}
