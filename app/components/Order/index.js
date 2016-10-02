/**
*
* Order
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage, FormattedNumber } from 'react-intl';
import messages from './messages';

import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

import OrderFrame from '../OrderFrame';
import Meal from '../Meal';

import styles from './styles.scss';

const priceSum = (meals = []) =>
  meals.reduce((sum, meal) => sum + meal.price, 0);

function Order({ order, active, onFocus }) {
  const Chevron = active ? FaAngleUp : FaAngleDown;
  return (
    <div className={styles.order}>
      <OrderFrame
        onClick={onFocus}
        className={styles.topFrame}
        what={<div>{order.from}</div>}
        who={<div>{order.owner}</div>}
        price={
          <div className={styles.priceWrap}>
            <div className={styles.priceText}>
              <FormattedNumber
                style="currency"
                currency="PLN"
                value={priceSum(order.meals) / 100}
              />
            </div>
            <Chevron className={styles.chevron} />
          </div>
        }
      />
      {active &&
        <div className={styles.details}>
          {order.meals && order.meals.length > 0 &&
            <OrderFrame
              className={styles.mealsHeader}
              what={<FormattedMessage {...messages.meals} />}
              who={<FormattedMessage {...messages.orderer} />}
              price={<FormattedMessage {...messages.price} />}
            />
          }
          <div>
            {(order.meals || []).map((meal, key) =>
              <Meal meal={meal} key={key} />
            )}
          </div>
        </div>
      }
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onFocus: PropTypes.func,
};

export default Order;
