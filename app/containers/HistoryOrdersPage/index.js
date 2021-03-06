/*
 *
 * HistoryOrdersPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerContext } from 'react-router/PropTypes';
import Helmet from 'react-helmet';
import OrderList from '../../components/OrdersList';
import { compose } from 'redux';
import { ordersConnector, ordersSelector } from '../../utils/ordersService';

import styles from './styles.scss';

export class HistoryOrdersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    orders: PropTypes.array,
    currentUser: PropTypes.string,
    params: PropTypes.object,
  };

  static contextTypes = {
    router: routerContext,
  };

  render() {
    const { orders, params, currentUser } = this.props;
    const { router } = this.context;
    return (
      <div className={styles.historyOrdersPage}>
        <Helmet title="History - AmciuApp" />
        <OrderList
          orders={orders}
          activeKey={params.order}
          onFocus={(id) => router.transitionTo(`/history/${id}`)}
          currentUser={currentUser}
        />
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
      .filter(([, order]) => order.archived),
  }), mapDispatchToProps)
)(HistoryOrdersPage);
