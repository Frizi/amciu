/**
*
* OrderFrame
*
*/

import React, { PropTypes } from 'react';
import styles from './styles.scss';
import cn from 'classnames';

const defaultNode = <div />;

function OrderFrame({ className, what, who, price }) {
  return (
    <div className={cn(styles.orderFrame, className)}>
      {what || defaultNode}
      {who || defaultNode}
      {price || defaultNode}
    </div>
  );
}

OrderFrame.propTypes = {
  className: PropTypes.string,
  what: PropTypes.node,
  who: PropTypes.node,
  price: PropTypes.node,
};

export default OrderFrame;
