import { Joker } from '../core/joker-api/jokers.model';
import { All, FIND_ALL_JOKERS, FIND_ALL_JOKERS_SUCCESS } from './jokers.actions';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

export interface State {
  jokers: Joker[];
  isLoading: boolean;
}

const initialState: State = {
  jokers: [],
  isLoading: false,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case FIND_ALL_JOKERS: {
      return { ...state, isLoading: true, jokers: [] };
    }

    case FIND_ALL_JOKERS_SUCCESS: {
      return { ...state, jokers: action.jokers, isLoading: false };
    }

    default: {
      return state;
    }
  }
}

export const getJokersState = createFeatureSelector<State>('jokers');
export const selectJokers = createSelector(getJokersState, (state: State) => state.jokers);
export const selectIsLoading = createSelector(getJokersState, (state: State) => state.isLoading);
