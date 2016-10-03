import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerContext } from 'react-router/PropTypes';
import { FormattedMessage } from 'react-intl';
import Match from 'react-router/Match';
import Helmet from 'react-helmet';
import OrderList from '../../components/OrdersList';
import Button from '../../components/Button';
import { compose } from 'redux';
import { ordersConnector, ordersSelector } from '../../utils/ordersService';
import styles from './styles.scss';
import FaPlus from 'react-icons/lib/fa/plus';
import messages from './messages';
import OrderModal from '../OrderModal';
import MealModal from '../MealModal';

export class ActiveOrdersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    orders: PropTypes.array.isRequired,
    currentUser: PropTypes.string,
    params: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: routerContext,
  };

  render() {
    const { orders, params, currentUser } = this.props;
    const { router } = this.context;
    const newPath = params.order ? `/${params.order}/new` : '/new';

    return (
      <div>
        <Helmet title="Active Orders - AmciuApp" />
        <div className={styles.actions}>
          <Button className={styles.buttonFullsize} to={newPath}>
            <FaPlus />
            <FormattedMessage {...messages.createOrder} />
          </Button>
        </div>
        <OrderList
          orders={orders}
          activeKey={params.order}
          onFocus={(id) => router.transitionTo(`/${id}`)}
          onAddMeal={(id) => router.transitionTo(`/${id}/new-meal`)}
          currentUser={currentUser}
        />
        <Match pattern="/:order?/new" component={OrderModal} />
        <Match pattern="/:order?/new-meal" component={MealModal} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default compose(
  ordersConnector,
  connect((state) => ({
    currentUser: (state.getIn(['firebase', 'auth']) || {}).displayName,
    orders: ordersSelector(state)
      .filter(([, order]) => !order.archived),
  }), mapDispatchToProps)
)(ActiveOrdersPage);
