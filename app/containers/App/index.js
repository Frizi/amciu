/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import AppHeader from '../../components/AppHeader';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { firebase as withFirebase, helpers } from 'redux-react-firebase';
const { pathToJS } = helpers;

import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import ConnectedRouter from '../ConnectedRouter';

import NotFoundPage from '../NotFoundPage';
import HomePage from '../HomePage';

import styles from './styles.scss';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.object.isRequired,
  };

  render() {
    return (
      <ConnectedRouter>
        <div className={styles.container}>
          <AppHeader auth={this.props.auth} onLogout={this.props.firebase.logout} />

          <Match pattern="/" component={HomePage} />
          <Match pattern="/history" component={HomePage} />
          <Miss component={NotFoundPage} />
        </div>
      </ConnectedRouter>
    );
  }
}

export default compose(
  withFirebase([]),
  connect((state) => {
    const firebase = state.get('firebase');
    return {
      auth: pathToJS(firebase, 'auth'),
      location: state.getIn(['route', 'location']),
    };
  })
)(App);
