import { REQUEST_PLANETS, RECEIVE_PLANETS } from '../actions';

const planets = (
  state = {
    isFetching: false,
    items: [],
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
    default:
      return state;
  }
};

export default planets;
