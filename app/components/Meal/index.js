import React, { PropTypes } from 'react';
import { FormattedNumber } from 'react-intl';
import FaTrash from 'react-icons/lib/fa/trash';

import OrderFrame from '../OrderFrame';
import Button from '../Button';

import styles from './styles.scss';

export const mealType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  orderer: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

function Meal({ meal: { name, orderer, price }, onDelete }) {
  return (
    <OrderFrame
      className={styles.meal}
      what={<div>{name}</div>}
      who={<div>{orderer}</div>}
      price={
        <div className={styles.priceWrap}>
          <div className={styles.priceText}>
            <FormattedNumber
              style="currency"
              currency="PLN"
              value={price / 100}
            />
          </div>
          {onDelete && <Button variant="action" onClick={onDelete}><FaTrash /></Button>}
        </div>
      }
    />
  );
}

Meal.propTypes = {
  meal: mealType.isRequired,
  onDelete: PropTypes.func,
};

export default Meal;
