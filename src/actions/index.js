import * as actionTypes from "./actionTypes";

export const getCurrencies = (start, limit) => ({
  type: actionTypes.GET_CURRENCIES,
  start,
  limit,
});

export const getCurrenciesStart = () => ({
  type: actionTypes.GET_CURRENCIES_START,
});

export const getCurrenciesSuccess = (start, limit, currencies) => ({
  type: actionTypes.GET_CURRENCIES_SUCCESS,
  start,
  limit,
  currencies,
});

export const getCurrenciesFail = (error) => ({
  type: actionTypes.GET_CURRENCIES_FAIL,
  error,
});

export const getCurrency = (id) => ({
  type: actionTypes.GET_CURRENCY,
  id,
});

export const getCurrencyStart = () => ({
  type: actionTypes.GET_CURRENCY_START,
});

export const getCurrencySuccess = (id, currency) => ({
  type: actionTypes.GET_CURRENCY_SUCCESS,
  id,
  currency,
});

export const getCurrencyFail = (error) => ({
  type: actionTypes.GET_CURRENCY_FAIL,
  error,
});
