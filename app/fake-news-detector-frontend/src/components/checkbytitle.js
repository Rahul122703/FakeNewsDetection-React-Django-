import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './header';
import Axios from 'axios';

function CheckByTitle() {
  document.title = 'News Guardian | Check news by title';
  let stage = 2;
  const [inputNewsTitle, setNewsTitle] = useState('');
  const [predictedValue, setPredictedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (inputNewsTitle.length < 1) {
      toast.error('Enter some text!');
      setIsLoading(false);
      return;
    }

    Axios.post('http://127.0.0.1:8000/api/usercheck/title/', { user_news: inputNewsTitle })
      .then((response) => {
        if (response.data.prediction === true) {
          setPredictedValue('True');
          toast.success("Real news!");
        } else {
          setPredictedValue('False');
          toast.error("Fake news!");
        }
      })
      .catch((error) => {
        console.error('Error submitting data: ', error);
        toast.error('An error occurred. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header activeContainer={stage} />
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Check News by Title</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium mb-2">News Title</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter news title..."
            rows={5}
            onChange={(e) => setNewsTitle(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isLoading ? 'Checking...' : 'Check'}
          </button>
        </form>
      </div>

      <div className="w-full max-w-2xl mx-auto mt-4 p-4 text-center">
        {predictedValue === 'True' && (
          <div className="text-green-600 font-semibold text-lg">✔️ Predicted as Real News!</div>
        )}
        {predictedValue === 'False' && (
          <div className="text-red-600 font-semibold text-lg">❌ Predicted as Fake News!</div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default CheckByTitle;
