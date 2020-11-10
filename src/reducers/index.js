import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
  REQUEST_PLANETS,
  RECEIVE_PLANETS,
  GO_TO_FILMS,
  GO_TO_RESIDENTS,
  VIEW_PLANET,
} from '../actions';

const planets = (
  state = {
    isFetching: false,
    items: [],
    planetDetail: null,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PLANETS:
      return {
        ...state,
        isFetching: false,
        items: action.planets,
      };
    case VIEW_PLANET:
      return {
        ...state,
        planetDetail: action.planet,
      };
    default:
      return state;
  }
};

const films = (
  state = {
    items: [],
  },
  action
) => {
  switch (action.type) {
    case GO_TO_FILMS:
      return {
        ...state,
        items: action.films,
      };
    default:
      return state;
  }
};

const residents = (
  state = {
    items: [],
  },
  action
) => {
  switch (action.type) {
    case GO_TO_RESIDENTS:
      return {
        ...state,
        items: action.residents,
      };
    default:
      return state;
  }
};

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    planets,
    films,
    residents,
  });

export default createRootReducer;
