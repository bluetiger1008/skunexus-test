export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const RECEIVE_PLANETS = 'RECEIVE_PLANETS';
export const GO_TO_FILMS = 'GO_TO_FILMS';
export const GO_TO_RESIDENTS = 'GO_TO_RESIDENTS';
export const VIEW_PLANET = 'VIEW_PLANET';

export const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

export const receivePlanets = (json) => ({
  type: RECEIVE_PLANETS,
  planets: json.results,
});

const shouldFetchPlanets = (state, subreddit) => {
  const planets = state.items;
  if (!planets || planets.length === 0) {
    return true;
  }
  if (planets.isFetching) {
    return false;
  }
};

export const fetchPlanets = () => (dispatch, getState) => {
  if (shouldFetchPlanets(getState())) {
    dispatch(requestPlanets());
    return fetch(`https://swapi.dev/api/planets`)
      .then((response) => response.json())
      .then((json) => dispatch(receivePlanets(json)));
  }
};

export const viewPlanet = (planet) => ({
  type: VIEW_PLANET,
  planet,
});

export const goToFilms = (films) => ({
  type: GO_TO_FILMS,
  films,
});

export const goToResidents = (residents) => ({
  type: GO_TO_RESIDENTS,
  residents,
});
