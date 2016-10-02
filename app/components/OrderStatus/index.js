/**
*
* OrderStatus
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import FaPencil from 'react-icons/lib/fa/pencil';
import FaLock from 'react-icons/lib/fa/lock';
import FaPhone from 'react-icons/lib/fa/phone';
import FaCheck from 'react-icons/lib/fa/check';

import styles from './styles.scss';

const allStatuses = ['opened', 'finalized', 'ordered', 'delivered'];
const statusIcons = [FaPencil, FaLock, FaPhone, FaCheck];

const statusBox = (status, onChange) => (statusName, Icon) =>
  <button
    onClick={() => onChange(statusName)}
    key={statusName}
    className={statusName === status ? styles.activeBox : styles.box}
  >
    <Icon />
    <FormattedMessage {...messages[statusName]} />
  </button>;

function OrderStatus({ status, onChange }) {
  const box = statusBox(status, onChange);
  return (
    <div className={styles.statusBar}>
      {allStatuses.map((s, i) => box(s, statusIcons[i]))}
    </div>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.oneOf(allStatuses).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OrderStatus;
