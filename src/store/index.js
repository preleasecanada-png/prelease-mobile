import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import reducers from '../redux/reducers';
import sagas from '../redux/sagas';

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(loggerMiddleware, thunk, sagaMiddleware)
);

// run the saga
sagaMiddleware.run(sagas);

export default store;
