import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeTickerFromListAction } from "../store/actions/listAction";

export const TableofStockHeader = () => {
  return (
    <div className="list-page-table-header">
      <div className="table-header">
        <ul className="table-column">
          <li className="table-left">Name</li>
          <li className="table-right">Symbol</li>
          <li className="table-right">Price</li>
          <li className="table-mid">Today</li>
          <li className="table-right">Market Cap</li>
        </ul>
        <div className="table-x">
          <FontAwesomeIcon
            className="exit-icon"
            icon={faWindowClose}
            alt="Remove Stonk From List"
          />
        </div>
      </div>
      <hr />
    </div>
  );
};
//////////////////////////////////////////////////////////////////////////////////////////////
export const TableOfStock = ({
  stock,
  currentList,
  setPopupAfterDeleteStock,
  setStockInPopupAfterDeleteStock,
}) => {
  const dispacht = useDispatch();

  const removeStockFromList = () => {
    // another solution (PopUpAddedList.js) but gotto find index of current ticker: currentList.tickers.splice(indexOfCurrentTicker, 1);
    currentList.tickers = currentList.tickers.filter(
      (stockInCurrentList) => stockInCurrentList.symbol !== stock.symbol
    );
    dispacht(removeTickerFromListAction(stock.symbol, currentList.id));
    setPopupAfterDeleteStock(true);
    setStockInPopupAfterDeleteStock(stock.symbol);
    setTimeout(() => {
      setPopupAfterDeleteStock(false);
    }, 2500);
  };
  return (
    <div className="list-page-table-item">
      <div className="table-item">
        <Link to={`/stocks/${stock.symbol}`}>
          <ul className="table-column">
            <li className="table-left">{stock.companyName}</li>
            <li className="table-right">{stock.symbol}</li>
            <li className="table-right">${stock.stockCurrentPrice}</li>
            <li className="table-mid">
              {stock.stockPercentChange > 0 ? (
                <FontAwesomeIcon
                  className="sort-icon stonk-up"
                  icon={faSortUp}
                />
              ) : (
                <FontAwesomeIcon
                  className="sort-icon stonk-down"
                  icon={faSortDown}
                />
              )}{" "}
              {stock.stockPercentChange > 0
                ? `+` + stock.stockPercentChange
                : stock.stockPercentChange}
              %
            </li>
            <li className="table-right">{stock.marketCap}</li>
          </ul>
        </Link>
        <div className="table-x">
          <FontAwesomeIcon
            onClick={removeStockFromList}
            className="exit-icon"
            icon={faWindowClose}
            alt="Remove Stonk From List"
          />
        </div>
      </div>
      <hr />
    </div>
  );
};
