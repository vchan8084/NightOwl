import { createStore, applyMiddleware } from 'redux';
import puppiesReducer from './reducers/puppies';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  puppiesReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
