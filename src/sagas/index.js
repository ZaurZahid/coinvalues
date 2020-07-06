import { takeLatest, put } from "redux-saga/effects";
import superagent from "superagent";

import * as actionTypes from "../actions/actionTypes";

import {
  getCurrenciesStart,
  getCurrenciesSuccess,
  getCurrenciesFail,
  getCurrencyStart,
  getCurrencySuccess,
  getCurrencyFail,
} from "../actions/";

export function* getCurrencies(action) {
  try {
    yield put(getCurrenciesStart());

    const resp = yield superagent.get("/currencies").query({
      start: action.start,
      limit: action.limit,
    });

    const obj = JSON.parse(resp.text);

    yield put(getCurrenciesSuccess(action.start, action.limit, obj.data));
  } catch (err) {
    yield put(getCurrenciesFail(err));
  }
}

export function* getCurrency(action) {
  try {
    yield put(getCurrencyStart());

    const resp = yield superagent.get("/currency/" + action.id);

    const obj = JSON.parse(resp.text);

    yield put(getCurrencySuccess(action.id, obj.data));
  } catch (err) {
    yield put(getCurrencyFail(err));
  }
}

export function* watchCurrencies() {
  yield takeLatest(actionTypes.GET_CURRENCIES, getCurrencies);
  yield takeLatest(actionTypes.GET_CURRENCY, getCurrency);
}
