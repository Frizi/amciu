/**
*
* Order
*
*/

import React, { PropTypes } from 'react';

import { FormattedNumber } from 'react-intl';
// import messages from './messages';
import OrderFrame from '../OrderFrame';

import styles from './styles.scss';

function Order({ order, active }) {
  return (
    <div className={styles.order}>
      <OrderFrame
        className={styles.topFrame}
        what={<div>{order.from}</div>}
        who={<div>{order.owner}</div>}
        price={<div><FormattedNumber value={order.price / 100} /></div>}
      />
      {active && <div>Active</div>}
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  active: PropTypes.bool,
};

export default Order;
