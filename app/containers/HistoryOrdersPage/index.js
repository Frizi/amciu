/*
 *
 * HistoryOrdersPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

export class HistoryOrdersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="HistoryOrdersPage"
          meta={[
            { name: 'description', content: 'Description of HistoryOrdersPage' },
          ]}
        />
        HistoryOrdersPage
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(HistoryOrdersPage);
