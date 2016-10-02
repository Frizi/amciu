import React, { PropTypes } from 'react';
import styles from './styles.scss';
import OrderFrame from '../OrderFrame';
import { FormattedNumber } from 'react-intl';

export const mealType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  orderer: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

function Meal({ meal: { name, orderer, price } }) {
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
        </div>
      }
    />
  );
}

Meal.propTypes = {
  meal: mealType,
};

export default Meal;
