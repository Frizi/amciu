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

import { map } from 'lodash';

function OrdersList({ orders }) {
  return (
    <div className={styles.ordersList}>
      <OrderFrame
        className={styles.header}
        what={<FormattedMessage {...messages.from} />}
        who={<FormattedMessage {...messages.owner} />}
        price={<FormattedMessage {...messages.price} />}
      />
      {map(orders, (order, key) => <Order key={key} order={order} />)}
    </div>
  );
}

OrdersList.propTypes = {
  orders: PropTypes.object.isRequired,
};

export default OrdersList;
