/**
*
* InputGroup
*
*/

import React, { PropTypes } from 'react';
import { Control } from 'react-redux-form';

import styles from './styles.scss';

function InputGroup({ label, component: Component = Control.text, ...rest }) {
  return (
    <label className={styles.inputGroup}>
      <div className={styles.label}>{ label }</div>
      <Component {...rest} />
    </label>
  );
}

InputGroup.propTypes = {
  label: PropTypes.node.isRequired,
  component: PropTypes.element,
};

export default InputGroup;
