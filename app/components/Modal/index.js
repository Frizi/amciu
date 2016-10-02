/**
*
* Modal
*
*/

import React, { PropTypes } from 'react';
import { Gateway } from 'react-gateway';

import CSSTransitionGroup from 'react-addons-css-transition-group';
import ReactModal2 from 'react-modal2';

import styles from './styles.scss';

const transitions = {
  enter: styles.enter,
  leave: styles.leave,
  active: styles.active,
};

function Modal({ onClose, children }) {
  return (
    <Gateway into="modalSlot">
      <CSSTransitionGroup
        transitionName={transitions}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        <ReactModal2
          onClose={onClose}
          backdropClassName={styles.backdrop}
          modalClassName={styles.modal}
        >
          {children}
        </ReactModal2>
      </CSSTransitionGroup>
    </Gateway>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
