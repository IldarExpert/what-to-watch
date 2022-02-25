import {createReducer} from '@reduxjs/toolkit';
import {AuthStatus} from '../../consts';
import {UserReducerType} from '../../types/store';
import {updateAuthStatus} from '../actions';

const initialState: UserReducerType = {
  authorizationStatus: AuthStatus.Unknown,
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
});
