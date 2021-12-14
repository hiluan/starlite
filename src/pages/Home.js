import { useEffect } from "react";
import News from "../components/News";
import NewsMain from "../components/NewsMain";
import PanelFavorites from "../components/PanelFavorites";
import { newsAction } from "../store/actions/newsAction";
import { useLocation } from "react-router";

// redux
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  // GET CURRENT LOCATION:
  const location = useLocation();
  // console.log(location.pathname);
  // FETCH STOCKS
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newsAction());
  }, [dispatch]);
  // get data back from state
  const { general, crypto, newsActive } = useSelector(
    (state) => state.entities.news
  );

  const generalWithoutBloomberg = general.filter(
    (key) => key.source !== "Bloomberg"
  );

  return (
    <div className="home">
      {newsActive ? (
        <div className="home-body">
          <div className="news-body">
            {/* {stockActive ? (
            <Stock />
          ) : ( */}
            <div className="main-news">
              {generalWithoutBloomberg.slice(0, 1).map((mainnews) => (
                <NewsMain key={mainnews.id} mainnews={mainnews} />
              ))}
            </div>
            {/* )} */}
            <div className="sub-news">
              <h3>Market News</h3>
              <hr />
              {generalWithoutBloomberg.slice(1, 7).map((news) => (
                <News key={news.id} news={news} />
              ))}
            </div>
          </div>
          {/* <div className="fav-body"> */}
          <div className="fav-container">
            <PanelFavorites />
            {/* </div> */}
          </div>
        </div>
      ) : (
        <div>
          <div class="blobs">
            <div class="blob-center"></div>
            <div class="blob"></div>
            <div class="blob"></div>
            <div class="blob"></div>
            <div class="blob"></div>
            <div class="blob"></div>
            <div class="blob"></div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Home;
