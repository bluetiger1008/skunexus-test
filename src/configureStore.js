import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import createRootReducer from './reducers';

export const history = createBrowserHistory();

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        ...middleware,
        routerMiddleware(history) // for dispatching history actions
      )
    )
  );

  return store;
}
