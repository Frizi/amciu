import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.scss';

import Firebase from 'firebase';
import FaPower from 'react-icons/lib/fa/power-off';
import FaGithub from 'react-icons/lib/fa/github';

import Button from '../Button';

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
        {auth &&
          <div className={styles.profile}>
            <img className={styles.avatar} src={auth.photoURL} alt="avatar" />
            {auth.displayName}
          </div>
        }
        {auth ?
          <Button
            variant="nav"
            onClick={onLogout}
          >
            <FaPower />
            <FormattedMessage {...messages.logout} />
          </Button> :
          <Button
            variant="nav"
            onClick={this.handleSignup}
          >
            <FaGithub />
            <FormattedMessage {...messages.login} />
          </Button>
        }
      </div>
    );
  }
}
