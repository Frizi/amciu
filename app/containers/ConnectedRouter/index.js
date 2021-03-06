/*
 * stolen from here
 * https://github.com/timdorr/react-router-redux/blob/c58f539bc38e3c68263fffead5987d9f290daf83/modules/ConnectedRouter.js
 */

import React, { Component, PropTypes } from 'react';
import BrowserHistory from 'react-history/BrowserHistory';
import StaticRouter from 'react-router/StaticRouter';

import { LOCATION_CHANGE } from './reducer';

class DispatchingRouter extends Component {
  static propTypes = {
    store: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    history: PropTypes.object,
    action: PropTypes.string,
    location: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    basename: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleLocationChange(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleLocationChange(nextProps);
  }

  handleLocationChange = ({ store, action, location }) => {
    store.dispatch({
      type: LOCATION_CHANGE,
      payload: { action, location },
    });
  };

  render() {
    const { history, action, location, basename, ...props } = this.props;

    return (
      <StaticRouter
        action={action}
        location={location}
        basename={basename}
        onPush={history.push}
        onReplace={history.replace}
        blockTransitions={history.block}
        {...props}
      />);
  }
}

class ConnectedRouter extends Component { // eslint-disable-line react/no-multi-comp
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.func,
    basename: PropTypes.string,
    keyLength: PropTypes.number,
  };

  static contextTypes = {
    store: PropTypes.object,
  };

  static defaultProps = {
    history: BrowserHistory,
  };

  render() {
    const { history: History, basename, keyLength, ...props } = this.props;

    return (
      <History basename={basename} keyLength={keyLength}>
        {({ history, action, location }) => (
          <DispatchingRouter
            store={this.context.store || this.props.store}
            history={history}
            action={action}
            location={location}
            basename={basename}
            {...props}
          />
        )}
      </History>
    );
  }
}

export default ConnectedRouter;
