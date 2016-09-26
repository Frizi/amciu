import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.scss';

import Firebase from 'firebase';


export default class AppHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    auth: PropTypes.object,
    onLogout: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {
    const provider = new Firebase.auth.GithubAuthProvider();
    Firebase.auth().signInWithPopup(provider);
  }

  render() {
    const { auth, onLogout } = this.props;
    return (
      <div className={styles.appHeader}>
        <div className={styles.logo}><FormattedMessage {...messages.header} /></div>
        <div className={styles.profile}>
          {auth ?
            <button onClick={onLogout}>
              {auth.displayName}
              <img className={styles.avatar} src={auth.photoURL} alt="avatar" />
              <FormattedMessage {...messages.logout} />
            </button> :
            <button onClick={this.handleSignup}><FormattedMessage {...messages.login} /></button>
          }
        </div>
      </div>
    );
  }
}
