/*
 * OrderStatus Messages
 *
 * This contains all the text for the OrderStatus component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  opened: {
    id: 'app.components.OrderStatus.opened',
    defaultMessage: 'Opened',
  },
  finalized: {
    id: 'app.components.OrderStatus.finalized',
    defaultMessage: 'Finalized',
  },
  ordered: {
    id: 'app.components.OrderStatus.ordered',
    defaultMessage: 'Ordered',
  },
  delivered: {
    id: 'app.components.OrderStatus.delivered',
    defaultMessage: 'Delivered',
  },
});
