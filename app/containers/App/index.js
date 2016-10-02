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

import ConnectedRouter from '../ConnectedRouter';
import { GatewayDest } from 'react-gateway';
import ReactModal2 from 'react-modal2';
import HomePage from '../HomePage';

import styles from './styles.scss';

ReactModal2.getApplicationElement = () => document.getElementById('appContainer');

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.object.isRequired,
  };

  render() {
    return (
      <ConnectedRouter>
        <div className={styles.container}>
          <div id="appContainer" className={styles.container}>
            <AppHeader auth={this.props.auth} onLogout={this.props.firebase.logout} />
            <HomePage className={styles.page} />
          </div>
          <GatewayDest name="modalSlot" />
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
