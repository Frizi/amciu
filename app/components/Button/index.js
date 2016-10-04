/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { PropTypes } from 'react';
import Link from 'react-router/Link';
import Ripple from 'react-ripple-effect/src/js/components/react-ripple';

import cn from 'classnames';
import styles from './styles.scss';

export default class Button extends React.Component {
  static defaultProps = {
    variant: 'default',
  };

  static propTypes = {
    ...Link.propTypes,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    variant: PropTypes.oneOf(['default', 'primary', 'flat', 'wrapper', 'nav', 'action']),
  };

  state = {
    cursorPos: {},
  };

  handleClick = ::this.handleClick;
  handleClick(e) {
    const cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now(),
    };
    this.setState({ cursorPos });
  }

  render() {
    const { variant, children, className, ...rest } = this.props;

    const handlers = {
      onMouseUp: this.handleClick,
      onTouchEnd: this.handleClick,
    };

    const finalClassName = cn(className, styles[variant]);
    const ripple = <Ripple cursorPos={this.state.cursorPos} />;

    const Component = (() => {
      if (this.props.to) {
        return Link;
      }
      if (variant === 'wrapper') {
        return 'div';
      }
      return 'button';
    })();

    return (
      <Component tabIndex="-1" className={finalClassName} {...handlers} {...rest}>
        {children}
        {ripple}
      </Component>
    );
  }
}
