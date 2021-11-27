const News = ({ news }) => {
  // convert unix timestamp to time
  function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    // let sec = a.getSeconds();
    let time =
      month +
      " " +
      date +
      ", " +
      year +
      " | " +
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (min < 10 ? "0" + min : min);
    // +":" +
    // (sec < 10 ? "0" + sec : sec);
    return time;
  }
  //   console.log(timeConverter(0));

  return (
    <div>
      <div className="news-item">
        <div className="news-header">
          <h4>{news.headline}</h4>
          <p className="news-subheader">
            {news.source} | {timeConverter(news.datetime)}
          </p>
          <p className="news-summary">{news.summary}</p>
        </div>
        <img src={news.image} alt={news.headline} />
      </div>
      <hr></hr>
    </div>
  );
};

export default News;
