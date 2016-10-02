/**
*
* Order
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage, FormattedNumber } from 'react-intl';
import messages from './messages';
import toPairs from 'lodash/toPairs';
import orderBy from 'lodash/orderBy';

import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaPlus from 'react-icons/lib/fa/plus';
import FaArchive from 'react-icons/lib/fa/archive';

import OrderFrame from '../OrderFrame';
import Button from '../Button';
import Meal from '../Meal';
import OrderStatus from '../OrderStatus';

import styles from './styles.scss';

const priceSum = (meals = []) =>
  meals.reduce((sum, meal) => sum + meal.price, 0);

const getMeals = (mealsSrc) =>
  orderBy(toPairs(mealsSrc || []), 0);

function Order({ order, onStatusChange, active, onFocus, onAddMeal, onArchive }) {
  const Chevron = active ? FaAngleUp : FaAngleDown;
  const meals = getMeals(order.meals || []);
  return (
    <div className={styles.order}>
      <Button variant="wrapper" onClick={onFocus}>
        <OrderFrame
          className={styles.topFrame}
          what={<div>{order.from}</div>}
          who={<div>{order.owner}</div>}
          price={
            <div className={styles.priceWrap}>
              <div className={styles.priceText}>
                <FormattedNumber
                  style="currency"
                  currency="PLN"
                  value={priceSum(meals) / 100}
                />
              </div>
              <Chevron className={styles.chevron} />
            </div>
          }
        />
      </Button>
      {active &&
        <div className={styles.details}>
          <div className={styles.detailsTop}>
            {order.status === 'opened' &&
              <Button variant="primary" onClick={onAddMeal}>
                <FaPlus />
                <FormattedMessage {...messages.addMeal} />
              </Button>
            }
            {order.status === 'delivered' && !order.archived &&
              <Button variant="flat" onClick={onArchive}>
                <FaArchive />
                <FormattedMessage {...messages.archive} />
              </Button>
            }
            <div className={styles.statusText}>
              <FormattedMessage {...messages.status} />
            </div>
            <OrderStatus onChange={order.archived ? () => {} : onStatusChange} status={order.status} />
          </div>

          {meals.length > 0 &&
            <OrderFrame
              className={styles.mealsHeader}
              what={<FormattedMessage {...messages.meals} />}
              who={<FormattedMessage {...messages.orderer} />}
              price={<FormattedMessage {...messages.price} />}
            />
          }
          <div>
            {meals.map(([key, meal]) =>
              <Meal meal={meal} key={key} />
            )}
          </div>
        </div>
      }
    </div>
  );
}

Order.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onFocus: PropTypes.func,
  onAddMeal: PropTypes.func,
  onArchive: PropTypes.func,
};

export default Order;
