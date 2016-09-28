/*
 * stolen from here
 * https://github.com/timdorr/react-router-redux/blob/c58f539bc38e3c68263fffead5987d9f290daf83/modules/reducer.js
 */

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  location: null,
};

export function routerReducer(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    return { ...state, ...payload };
  }

  return state;
}
