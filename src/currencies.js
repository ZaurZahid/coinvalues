import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from "./actions/";

import { useLocation, useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

import classnames from "classnames";

import _ from "lodash";

import { thousands_separators } from "./utils/func";

const Currencies = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page"));

  const currencies = useSelector((state) => state.currencies);
  const loading = useSelector((state) => state.loading);

  const pages = Math.ceil(currencies.length / 20);

  useEffect(() => {
    if (currencies.length === 0) {
      history.push("/?page=0");
      dispatch(getCurrencies(0, 0));
    }
  }, [currencies]);

  const getUpdates = () => {
    const page = parseInt(query.get("page"));
    dispatch(getCurrencies(20 * page, 20));
  };

  useEffect(() => {
    if (!loading && currencies.length > 0) {
      const timer = setInterval(getUpdates, 30000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [loading]);

  return currencies.length === 0 ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" />
    </div>
  ) : (
    <React.Fragment>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Capitalization</th>
              <th>Price</th>
              <th>Volume (24Hr)</th>
              <th>Change (24Hr)</th>
            </tr>
          </thead>
          <tbody>
            {currencies.slice(page * 20, (page + 1) * 20).map((currency) => (
              <tr
                key={currency.id}
                onClick={() => history.push(`/currency/${currency.id}`)}
                style={{ cursor: "Pointer" }}
              >
                <td>{currency.name}</td>
                <td>
                  {"$" +
                    thousands_separators(
                      parseFloat(currency.marketCapUsd).toFixed(2)
                    )}
                </td>
                <td>
                  {"$" +
                    thousands_separators(
                      parseFloat(currency.priceUsd).toFixed(2)
                    )}
                </td>
                <td>
                  {"$" +
                    thousands_separators(
                      parseFloat(currency.volumeUsd24Hr).toFixed(2)
                    )}
                </td>
                <td>
                  {parseFloat(currency.changePercent24Hr).toFixed(2) + "%"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link" to="/?page=0">
            First
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to={"/?page=" + Math.max(page - 1, 0)}>
            Previous
          </Link>
        </li>
        {_.range(pages).map((index) => (
          <li
            className={classnames("page-item", { active: index === page })}
            key={index}
          >
            <Link className="page-link" to={"/?page=" + index}>
              {index + 1}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link
            className="page-link"
            to={"/?page=" + Math.min(page + 1, pages - 1)}
          >
            Next
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to={"/?page=" + (pages - 1)}>
            Last
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Currencies;
