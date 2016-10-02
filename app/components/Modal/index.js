/**
*
* Modal
*
*/

import React, { PropTypes } from 'react';
import { Gateway } from 'react-gateway';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactModal2 from 'react-modal2';
import FaClose from 'react-icons/lib/fa/close';

import styles from './styles.scss';

const transitions = {
  enter: styles.enter,
  enterActive: styles.enterActive,
  leave: styles.leave,
  leaveActive: styles.leaveActive,
  appear: styles.enter,
  appearActive: styles.enterActive,
};

export default class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    opened: true,
  };

  onClose = ::this.onClose;
  onClose() {
    if (this.state.opened) {
      const { onClose } = this.props;
      this.setState({ opened: false });
      setTimeout(onClose, 250);
    }
  }

  render() {
    const { title, children } = this.props;
    return (
      <Gateway into="modalSlot">
        <ReactCSSTransitionGroup
          transitionName={transitions}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
          transitionAppear
          transitionAppearTimeout={250}
        >
          {this.state.opened &&
            <ReactModal2
              key="modal"
              onClose={this.onClose}
              backdropClassName={styles.backdrop}
              modalClassName={styles.modal}
            >
              <div className={styles.title}>
                <div className={styles.titleContent}>{title}</div>
                <FaClose
                  tabIndex="-1"
                  onClick={this.onClose}
                  className={styles.close}
                />
              </div>
              <div className={styles.body}>
                {children}
              </div>
            </ReactModal2>
          }
        </ReactCSSTransitionGroup>
      </Gateway>
    );
  }
}
