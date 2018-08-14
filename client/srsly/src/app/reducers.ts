import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {RouterStateUrl} from '@davinkevin/router-store-helper';
import {environment} from '../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
