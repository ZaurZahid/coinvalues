import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currencies: [],
  currency: null,
  loading: false,
};

const getCurrenciesStart = (state, action) => {
  return { ...state, loading: true };
};

const getCurrenciesSuccess = (state, action) => {
  let newCurrencies;

  if (action.limit === 0) {
    newCurrencies = action.currencies;
  } else {
    newCurrencies = [...state.currencies];

    for (let i = 0; i < action.limit; i++) {
      newCurrencies[action.start + i] = action.currencies[i];
    }
  }

  return { ...state, currencies: newCurrencies, loading: false };
};

const getCurrenciesFail = (state, action) => {
  return { ...state, loading: false };
};

const getCurrencyStart = (state, action) => {
  return { ...state, loading: true };
};

const getCurrencySuccess = (state, action) => {
  return { ...state, currency: action.currency, loading: false };
};

const getCurrencyFail = (state, action) => {
  return { ...state, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENCIES_START:
      return getCurrenciesStart(state, action);
    case actionTypes.GET_CURRENCIES_SUCCESS:
      return getCurrenciesSuccess(state, action);
    case actionTypes.GET_CURRENCIES_FAIL:
      return getCurrenciesFail(state, action);
    case actionTypes.GET_CURRENCY_START:
      return getCurrencyStart(state, action);
    case actionTypes.GET_CURRENCY_SUCCESS:
      return getCurrencySuccess(state, action);
    case actionTypes.GET_CURRENCY_FAIL:
      return getCurrencyFail(state, action);
    default:
      return state;
  }
};

export default reducer;
