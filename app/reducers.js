/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { combineForms } from 'react-redux-form';
import { routerReducer } from './containers/ConnectedRouter/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { firebaseStateReducer } from 'redux-react-firebase';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    router: routerReducer,
    language: languageProviderReducer,
    firebase: firebaseStateReducer,
    forms: combineForms({
      createOrder: {
        name: '',
      },
      createMeal: {},
    }),
    ...asyncReducers,
  });
}
