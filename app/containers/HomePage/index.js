/*
 * HomePage
 *
 * main orders frame
 *
 */

import React, { PropTypes } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import HistoryOrdersPage from '../HistoryOrdersPage';
import ActiveOrdersPage from '../ActiveOrdersPage';
import NotFoundPage from '../NotFoundPage';

import Link from 'react-router/Link';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

import styles from './styles.scss';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const activePattern = '/:order(\\d+)?/:new(new)?';
    const historyPattern = '/history/:order(\\d+)?';

    return (
      <div className={cn(styles.homePage, this.props.className)}>
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
          <div className={styles.container}>
            <Match pattern={historyPattern} component={HistoryOrdersPage} />
            <Match pattern={activePattern} component={ActiveOrdersPage} />
            <Miss component={NotFoundPage} />
          </div>
        </section>
      </div>
    );
  }
}
