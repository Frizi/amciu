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
import CreateOrderModal from '../CreateOrderModal';

export class ActiveOrdersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    orders: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: routerContext,
  };

  render() {
    const { orders, params } = this.props;
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
        <OrderList orders={orders} activeKey={params.order} onFocus={(id) => router.transitionTo(`/${id}`)} />
        <Match pattern="/:id?/new" component={CreateOrderModal} />
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
    orders: ordersSelector(state)
      .filter(([, order]) => !order.archived),
  }), mapDispatchToProps)
)(ActiveOrdersPage);
