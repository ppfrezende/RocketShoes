import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { addToCartSuccess, updateAmountSuccess } from './actions';
import { setProductStatus } from '../product/actions';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  yield put(setProductStatus(id, true));

  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  try {
    if (amount > stockAmount) {
      toast.error('Quantidade solicitada excede o estoque atual');
      return;
    }

    if (productExists) {
      yield put(updateAmountSuccess(id, amount));
    } else {
      const response = yield call(api.get, `products/${id}`);

      const data = {
        ...response.data,
        amount: 1,
        priceFormatted: formatPrice(response.data.price),
      };

      yield put(addToCartSuccess(data));
    }
  } finally {
    yield put(setProductStatus(id, false));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada excede o estoque atual');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
