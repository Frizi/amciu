/*
 *
 * ActiveOrdersPage
 *
 */

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
import Modal from '../../components/Modal';
import messages from './messages';

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
    const returnPath = params.order ? `/${params.order}` : '/';
    const closeModal = () => router.transitionTo(returnPath);

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
        <Match pattern="/:id?/new">{({ matched }) => {
          if (matched) {
            return (
              <Modal
                title={<FormattedMessage {...messages.createOrder} />}
                onClose={closeModal}
              >
                New!
              </Modal>
            );
          }
          return null;
        }}</Match>
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
