import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./header";
import Axios from "axios";
import { useApiContext } from "../apiContext";

function CheckByTitle() {
  document.title = "Check news by title";
  let stage = 2;
  const [inputNewsTitle, setNewsTitle] = useState("");
  const [predictedValue, setPredictedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { api_link } = useApiContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (inputNewsTitle.trim() === "") {
      toast.error("Enter some text!");
      setIsLoading(false);
      return;
    }

    Axios.post(`${api_link}/api/usercheck/title/`, {
      user_news: inputNewsTitle,
    })
      .then((response) => {
        if (response.data.prediction === true) {
          setPredictedValue("True");
          toast.success("Real news!");
        } else {
          setPredictedValue("False");
          toast.error("Fake news!");
        }
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header activeContainer={stage} />
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Check News by Title
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              News Title
            </label>
            <textarea
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter news title..."
              rows={4}
              onChange={(e) => setNewsTitle(e.target.value)}></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-all">
            {isLoading ? "Checking..." : "Check"}
          </button>
        </form>
        {predictedValue && (
          <div
            className={`text-lg font-semibold text-center py-2 rounded-lg ${
              predictedValue === "True"
                ? "text-green-600 bg-green-100"
                : "text-red-600 bg-red-100"
            }`}>
            {predictedValue === "True"
              ? "✔️ Predicted as Real News!"
              : "❌ Predicted as Fake News!"}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default CheckByTitle;
