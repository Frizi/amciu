/**
*
* OrdersList
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import OrderFrame from '../OrderFrame';
import Order from '../Order';
import messages from './messages';
import styles from './styles.scss';
import { firebase as withFirebase } from 'redux-react-firebase';


function OrdersList({ orders, activeKey, onFocus, onAddMeal, currentUser, firebase }) {
  const updateStatus = (key, status) => {
    firebase.set(`/orders/${key}/status`, status);
  };

  const archive = (key) => {
    firebase.set(`/orders/${key}/archived`, true);
  };

  const deleteMeal = (key, mealKey) => {
    firebase.remove(`/orders/${key}/meals/${mealKey}`);
  };

  return (
    <div>
      <OrderFrame
        className={styles.header}
        what={<FormattedMessage {...messages.from} />}
        who={<FormattedMessage {...messages.owner} />}
        price={<FormattedMessage {...messages.price} />}
      />
      {orders.map(([key, order]) => (
        <Order
          key={key}
          order={order}
          active={key === activeKey}
          onFocus={() => onFocus(key)}
          onAddMeal={() => onAddMeal(key)}
          onDeleteMeal={(mealKey) => deleteMeal(key, mealKey)}
          onStatusChange={(status) => updateStatus(key, status)}
          onArchive={() => archive(key)}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  activeKey: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onAddMeal: PropTypes.func,
  firebase: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

export default withFirebase()(OrdersList);
