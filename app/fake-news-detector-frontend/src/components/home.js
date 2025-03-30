import React, { useState, useEffect } from "react";
import Header from "./header";
import Axios from "axios";
import { useApiContext } from "../apiContext";
import Loader from "./Loader";

function Home() {
  document.title = "Mini Project";
  const [liveNews, setLiveNews] = useState([]);
  const [mustSeeNews, setMustSeeNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ["Sport", "Lifestyle", "Arts", "News"];
  const { api_link } = useApiContext();

  useEffect(() => {
    fetchNewsData();
    const intervalId = setInterval(fetchNewsData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchNewsData = () => {
    setLoading(true);
    Axios.get(`${api_link}/api/live/`)
      .then((res) => setLiveNews(res.data))
      .catch((err) => console.error("Error fetching live news:", err));

    Axios.get(`${api_link}/api/category/News/`)
      .then((res) => setMustSeeNews(res.data))
      .catch((err) => console.error("Error fetching must-see news:", err));

    Promise.all(
      categories.map((category) =>
        Axios.get(`${api_link}/api/category/${category}/`)
          .then((res) => (res.data.length ? res.data[0] : null))
          .catch((err) => {
            console.error(`Error fetching ${category} news:`, err);
            return null;
          })
      )
    )
      .then((newsData) => setAllNews(newsData.filter((item) => item)))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header activeContainer={1} />
      <div className="px-10 py-6 bg-gray-100 min-h-screen ">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h3 className="text-lg text-center text-gray-600 mb-6">
              LIVE NEWS
            </h3>
            {liveNews.length >= 10 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {liveNews.slice(0, 10).map((news, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg shadow-md bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-80">
                    {news.img_url !== "None" && (
                      <img
                        src={news.img_url}
                        className="w-full h-40 object-cover rounded-md mb-2"
                        alt="News"
                      />
                    )}
                    <a
                      href={news.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold">
                      {news.title}
                    </a>
                    <div className="text-gray-500 text-sm mt-1">
                      {new Date(news.publication_date).toLocaleString()}
                    </div>
                    <div
                      className={`mt-2 p-2 text-white text-center rounded ${
                        news.prediction ? "bg-green-500" : "bg-red-500"
                      }`}>
                      {news.prediction
                        ? "✔ Predicted as Real News"
                        : "✖ Predicted as Fake News"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Not enough data to display</p>
            )}

            <div className="mt-6">
              <h3 className="text-xl font-bold">Must See</h3>
              <hr className="border-gray-300 my-2" />
            </div>
            {mustSeeNews.length >= 4 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full border border-none mx-auto flex flex-row justify-between m-auto w-[80rem]">
                {mustSeeNews.slice(0, 4).map((news, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg shadow-md bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-72">
                    {news.img_url !== "None" && (
                      <img
                        src={news.img_url}
                        className="w-full h-40 object-cover rounded-md mb-2"
                        alt="Must See News"
                      />
                    )}
                    <a
                      href={news.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold block">
                      {news.title}
                    </a>
                    <div className="text-gray-500 text-sm mt-1">
                      {new Date(news.publication_date).toLocaleString()}
                    </div>
                    <div
                      className={`mt-2 p-2 text-white text-center rounded ${
                        news.prediction ? "bg-green-500" : "bg-red-500"
                      }`}>
                      {news.prediction
                        ? "✔ Predicted as Real News"
                        : "✖ Predicted as Fake News"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Not enough data to display</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
