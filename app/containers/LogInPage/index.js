/*
 *
 * LogInPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.scss';

export class LogInPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.logInPage}>
        <Helmet
          title="LogInPage"
          meta={[
            { name: 'description', content: 'AmciuApp - log in' },
          ]}
        />
        <div className={styles.message}>
          <FormattedMessage {...messages.header} />
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(LogInPage);
