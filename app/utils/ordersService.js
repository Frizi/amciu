import { firebase as withFirebase, helpers } from 'redux-react-firebase';
import orderBy from 'lodash/orderBy';
import toPairs from 'lodash/toPairs';
const { dataToJS } = helpers;

export const ordersConnector = withFirebase([['/orders']]);

export const ordersSelector = (state) => {
  const firebase = state.get('firebase');
  const ordersObject = dataToJS(firebase, '/orders') || {};
  return orderBy(toPairs(ordersObject), 0, 'desc');
};
