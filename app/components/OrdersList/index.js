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


function OrdersList({ orders, activeKey, onFocus }) {
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
        />
      ))}
    </div>
  );
}

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  activeKey: PropTypes.string,
  onFocus: PropTypes.func,
};

export default OrdersList;
