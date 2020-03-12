import { combineReducers } from 'redux';

import cart from './cart/reducer';
import products from './product/reducer';

export default combineReducers({
  cart,
  products,
});
