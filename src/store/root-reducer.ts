import {combineReducers} from 'redux';
import {dataReducer} from './data-reducer/data-reducer'

export const rootReducer = combineReducers({
  // user: userReducer,
  data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
