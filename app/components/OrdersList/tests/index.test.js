import OrdersList from '../index';
import Order from '../../Order';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<OrdersList />', () => {
  const renderComponent = (props = {}) => shallow(
    <OrdersList {...props} />
  );

  const orders = [
    ['0', {}],
    ['1', {}],
    ['2', {}],
  ];

  const activeKey = '1';

  it('should render a parent div', () => {
    expect(renderComponent({ orders, activeKey }).type()).toEqual('div');
  });

  it('should render a list of orders', () => {
    const component = renderComponent({ orders, activeKey });
    expect(component.find(Order).length).toEqual(3);
  });

  it('should mark only correct order as active', () => {
    const component = renderComponent({ orders, activeKey });
    const renderedOrders = component.find(Order);
    expect(renderedOrders.at(0).prop('active')).toNotExist();
    expect(renderedOrders.at(1).prop('active')).toExist();
    expect(renderedOrders.at(2).prop('active')).toNotExist();
  });
});
