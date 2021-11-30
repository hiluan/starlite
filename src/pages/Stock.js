import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { socket } from "../api";
import News from "../components/News";
import Trade from "../components/Trade";

const Stock = () => {
  const { company, quote, companyNews, basicFinancials, stockActive } =
    useSelector((state) => state.stocks);
  const { general } = useSelector((state) => state.news);
  // Market Cap display
  const marketCapLength = Math.round(company.marketCapitalization).toString()
    .length;
  const marketCapMillion = Math.round(company.marketCapitalization) + "M";
  const marketCapBillion =
    +(Math.round((company.marketCapitalization * 100) / 1000) + "e-2") + "B";
  const marketCapTrillion =
    Math.round(company.marketCapitalization)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .slice(0, -4) + "B";

  // // Connection opened -> Subscribe
  // const tesssst = socket.addEventListener("open", function (event) {
  //   socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
  //   console.log("open", event.data);
  // });
  // // Listen for messages
  // const testtt = socket.addEventListener("message", function (event) {
  //   console.log("Message from server ", event);
  // });

  // // Unsubscribe
  // var unsubscribe = function (symbol) {
  //   socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  // };

  return (
    <div className="home">
      {stockActive && (
        <div className="home-body">
          <div className="stock-body">
            <div className="quote">
              <div
                className={
                  quote.d > 0 ? "quote-header green" : "quote-header red"
                }
              >
                <h3>{company.name}</h3>
                <h1 className="quote-current">${quote.c}</h1>
              </div>
              <p className="quote-change">
                {quote.d < 0 ? (
                  <span>
                    {quote.d.toString().slice(0, 1)}$
                    {quote.d.toString().slice(1)} (
                    {Math.round(quote.dp * 100) / 100}
                    %)
                  </span>
                ) : (
                  <span>
                    +${quote.d} (+{Math.round(quote.dp * 100) / 100}
                    %)
                  </span>
                )}
                <span> Today</span>
              </p>
            </div>
            <div className="basic-financials">
              <h3>Key statistics</h3>
              <hr />
              <ul>
                <li>
                  <dt>High price of the day:</dt>
                  <dd>${quote.h}</dd>
                </li>
                <li>
                  <dt>Low price of the day:</dt> <dd>${quote.l}</dd>
                </li>
                <li>
                  <dt>Open price of the day:</dt> <dd>${quote.o}</dd>
                </li>
                <li>
                  <dt>Previous close price:</dt> <dd>${quote.pc}</dd>
                </li>
                <li>
                  <dt>Market Cap: </dt>
                  <dd>
                    {marketCapLength > 3
                      ? marketCapLength > 6
                        ? marketCapTrillion
                        : marketCapBillion
                      : marketCapMillion}
                  </dd>
                </li>
              </ul>
            </div>
            <div className="company-info">
              <h3>About</h3>
              <hr />
              <ul>
                <li>
                  <dt>{company.name}</dt>
                  <dd>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                    ratione, exercitationem maiores officiis voluptate quo
                    facilis dignissimos corrupti at quod perspiciatis soluta
                    ipsam magnam, assumenda consequatur neque cupiditate esse
                    praesentium.
                  </dd>
                </li>
                <li>
                  <img src={company.logo} alt="" />
                </li>
                <li>
                  <dt>Ticker: </dt>
                  <dd>{company.ticker}</dd>
                </li>
                <li>
                  <dt>Industry: </dt>
                  <dd>{company.finnhubIndustry}</dd>
                </li>

                {/* <button onClick={tesssst}>test</button> */}
                {/* <p>{basicFinancials.metric.52WeekHigh}</p> */}
                {/* <p>52 Week High Date{basicFinancials.52WeekHighDate}</p>
        <p>52 Week Low {basicFinancials.52WeekLow}</p>
        <p>52 Week Low Date {basicFinancials.52WeekLowDate}</p>
        <p>52 Week High {basicFinancials.52WeekHigh}</p>
        <p>52 Week High {basicFinancials.52WeekHigh}</p>
        <p>52 Week High {basicFinancials.52WeekHigh}</p>
        <p>52 Week High {basicFinancials.52WeekHigh}</p> */}
                {/* <p>52 Week High {basicFinancials.10DayAverageTradingVolume}</p> */}
              </ul>
            </div>
            <div className="company-news">
              <h3>Company News</h3>
              <hr />
              {companyNews.slice(0, 6).map((news) => (
                <News news={news} key={news.id} />
              ))}
              <a href="#">See more</a>
            </div>
          </div>
          <div className="trade-body">
            <div className="trade-container">
              <Trade company={company} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Stock;
