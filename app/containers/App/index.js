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

import styles from './styles.scss';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    auth: PropTypes.object,
    children: React.PropTypes.node,
    firebase: PropTypes.object.isRequired,
  };

  render() {
    const { auth, firebase } = this.props;
    return (
      <div className={styles.container}>
        <AppHeader auth={auth} onLogout={firebase.logout} />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

export default compose(
  withFirebase([]),
  connect((state) => {
    const firebase = state.get('firebase');
    return {
      auth: pathToJS(firebase, 'auth'),
    };
  })
)(App);
