import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
  REQUEST_PLANETS,
  RECEIVE_PLANETS,
  GO_TO_FILMS,
  GO_TO_RESIDENTS,
  VIEW_PLANET,
} from '../actions';

const app = (
  state = {
    isFetching: false,
    planets: [],
    planetDetail: null,
    selectedFilms: [],
    selectedResidents: [],
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
        planets: action.planets,
      };
    case VIEW_PLANET:
      return {
        ...state,
        planetDetail: action.planet,
      };
    case GO_TO_FILMS:
      return {
        ...state,
        selectedFilms: action.films,
      };
    case GO_TO_RESIDENTS:
      return {
        ...state,
        selectedResidents: action.residents,
      };
    default:
      return state;
  }
};

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app,
  });

export default createRootReducer;
