import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getCurrency } from "./actions";

import { thousands_separators } from "./utils/func";

const Currency = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const loading = useSelector((state) => state.loading);
  const currency = useSelector((state) => state.currency);

  useEffect(() => {
    if (!loading) {
      dispatch(getCurrency(params.id));

      const timer = setInterval(getUpdate, 30000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [params]);

  const getUpdate = () => {
    const { id } = params;
    dispatch(getCurrency(id));
  };

  return currency !== null ? (
    <div className="container">
      <div className="row">
        <div className="col-4 text-right text-primary">
          <h5>Rank</h5>
          <h5>Symbol</h5>
          <h5>Name</h5>
          <h5>Supply</h5>
          <h5>Max Supply</h5>
          <h5>Market Cap</h5>
          <h5>Volume (24Hr)</h5>
          <h5>Price</h5>
          <h5>Change (24Hr)</h5>
          <h5>VWAP (24Hr)</h5>
        </div>
        {loading ? (
          <div className="spinner-border text-primary" />
        ) : (
          <div className="col-8 text-left text-info">
            <h5>{currency.rank}</h5>
            <h5>{currency.symbol}</h5>
            <h5>{currency.name}</h5>
            <h5>
              {thousands_separators(parseFloat(currency.supply).toFixed(2))}
            </h5>
            <h5>
              {thousands_separators(parseFloat(currency.maxSupply).toFixed(2))}
            </h5>
            <h5>
              {"$" +
                thousands_separators(
                  parseFloat(currency.marketCapUsd).toFixed(2)
                )}
            </h5>
            <h5>
              {"$" +
                thousands_separators(
                  parseFloat(currency.volumeUsd24Hr).toFixed(2)
                )}
            </h5>
            <h5>
              {"$" +
                thousands_separators(parseFloat(currency.priceUsd).toFixed(2))}
            </h5>
            <h5>{parseFloat(currency.changePercent24Hr).toFixed(2) + "%"}</h5>
            <h5>
              {"$" +
                thousands_separators(parseFloat(currency.vwap24Hr).toFixed(2))}
            </h5>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Currency;
