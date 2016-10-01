/*
 *
 * ActiveOrdersPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerContext } from 'react-router/PropTypes';
import Helmet from 'react-helmet';
import OrderList from '../../components/OrdersList';
import { compose } from 'redux';
import { ordersConnector, ordersSelector } from '../../utils/ordersService';

export class ActiveOrdersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    orders: PropTypes.array,
    params: PropTypes.object,
  };

  static contextTypes = {
    router: routerContext,
  };

  render() {
    const { orders, params } = this.props;
    const { router } = this.context;
    return (
      <div>
        <Helmet
          title="ActiveOrdersPage"
          meta={[
            { name: 'description', content: 'Description of ActiveOrdersPage' },
          ]}
        />
        <OrderList orders={orders} activeKey={params.order} onFocus={(id) => router.transitionTo(`/${id}`)} />
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
