import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import Header from "./header";
import { useApiContext } from "../apiContext";

const CategoryContainer = () => {
  const { category } = useParams();
  const [newsData, setNewsData] = useState([]);
  const { api_link } = useApiContext();
  const fetchNewsData = () => {
    const capitalizedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
    Axios.get(`${api_link}/api/category/${capitalizedCategory}/`)
      .then((response) => {
        setNewsData(response.data);
        if (response.data.length < 10) {
          toast.error("Not enough data");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchNewsData();
  }, [category]);

  return (
    <>
      <Header activeContainer={1} />
      <div className="container mx-auto p-4">
        {newsData.length > 9 ? (
          <div className="grid gap-6">
            {/* Main news item */}
            <div className="flex flex-col md:flex-row bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex-1">
                <h4 className="text-lg font-bold">{newsData[0].title}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(newsData[0].publication_date).toLocaleString()}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    newsData[0].prediction ? "text-green-500" : "text-red-500"
                  }`}>
                  {newsData[0].prediction
                    ? "Predicted as Real News"
                    : "Predicted as Fake News"}
                </p>
              </div>
              {newsData[0].img_url !== "None" && (
                <img
                  src={newsData[0].img_url}
                  className="w-40 h-40 object-cover rounded-md"
                  alt="News"
                />
              )}
            </div>

            {/* Other news items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsData.slice(1, 10).map((news, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  {news.img_url !== "None" && (
                    <img
                      src={news.img_url}
                      className="w-full h-32 object-cover rounded-md"
                      alt="News"
                    />
                  )}
                  <h5 className="text-md font-bold mt-2">{news.title}</h5>
                  <p className="text-sm text-gray-600">
                    {new Date(news.publication_date).toLocaleString()}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      news.prediction ? "text-green-500" : "text-red-500"
                    }`}>
                    {news.prediction
                      ? "Predicted as Real News"
                      : "Predicted as Fake News"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-6">
            Not enough news to display
          </p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CategoryContainer;
