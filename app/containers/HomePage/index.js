/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import messages from './messages';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.orders} /></h1>
        <ul>
          <li><Link to="/"><FormattedMessage {...messages.active} /></Link></li>
          <li><Link to="/history"><FormattedMessage {...messages.history} /></Link></li>
        </ul>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
