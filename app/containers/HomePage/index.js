/*
 * HomePage
 *
 * main orders frame
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import HistoryOrdersPage from '../HistoryOrdersPage';
import ActiveOrdersPage from '../ActiveOrdersPage';
import LogInPage from '../LogInPage';
import NotFoundPage from '../NotFoundPage';

import Link from 'react-router/Link';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

import styles from './styles.scss';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    auth: PropTypes.object,
  };

  render() {
    const activePattern = '/:order([^/]{8,})?/:new(new|new-meal)?';
    const historyPattern = '/history/:order([^/]{8,})?';
    const { auth } = this.props;

    return (
      <div className={styles.homePage}>
        <section className={styles.header}>
          <h1><FormattedMessage {...messages.orders} /></h1>
          <nav>
            <Match pattern={activePattern}>{({ matched }) => (
              <Link className={styles.tab} activeClassName={styles.activeTab} isActive={() => matched} to="/">
                <FormattedMessage {...messages.active} />
              </Link>
            )}</Match>
            <Link className={styles.tab} activeClassName={styles.activeTab} to="/history">
              <FormattedMessage {...messages.history} />
            </Link>
          </nav>
        </section>
        <section className={styles.orderSection}>
          { auth ?
            <div className={styles.pageContainer}>
              <Match pattern={historyPattern} component={HistoryOrdersPage} />
              <Match pattern={activePattern} component={ActiveOrdersPage} />
              <Miss component={NotFoundPage} />
            </div> :
            <div className={styles.pageContainer}>
              <Match pattern={historyPattern} component={LogInPage} />
              <Match pattern={activePattern} component={LogInPage} />
              <Miss component={NotFoundPage} />
            </div>
          }
        </section>
      </div>
    );
  }
}

export default connect((state) => ({
  auth: state.getIn(['firebase', 'auth']),
}))(HomePage);
