/*
 *
 * ActiveOrdersPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import OrderList from '../../components/OrdersList';
import { compose } from 'redux';
import { firebase as withFirebase, helpers } from 'redux-react-firebase';
const { dataToJS } = helpers;

export class ActiveOrdersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    orders: PropTypes.any,
  };

  render() {
    const { orders } = this.props;
    return (
      <div>
        <Helmet
          title="ActiveOrdersPage"
          meta={[
            { name: 'description', content: 'Description of ActiveOrdersPage' },
          ]}
        />
        <OrderList orders={orders} />
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
  withFirebase([
    ['/orders#&orderByKey'],
  ]),
  connect((state) => {
    const firebase = state.get('firebase');
    return {
      orders: dataToJS(firebase, '/orders') || {},
    };
  }, mapDispatchToProps)
)(ActiveOrdersPage);
