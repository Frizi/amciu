/*
 * MealModal Messages
 *
 * This contains all the text for the MealModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.MealModal.header',
    defaultMessage: 'Add Meal',
  },
  meal: {
    id: 'app.containers.MealModal.meal',
    defaultMessage: 'Meal name',
  },
  mealPlaceholder: {
    id: 'app.containers.MealModal.mealPlaceholder',
    defaultMessage: 'Name of the meal',
  },
  price: {
    id: 'app.containers.MealModal.price',
    defaultMessage: 'Price',
  },
  pricePlaceholder: {
    id: 'app.containers.MealModal.pricePlaceholder',
    defaultMessage: 'Meal total price',
  },
});
