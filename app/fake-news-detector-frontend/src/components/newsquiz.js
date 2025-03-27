import React, { useState, useEffect } from 'react';
import Header from './header';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function NewsQuiz() {
  document.title = 'News Guardian | News Quiz';
  let stage = 3;

  const quizData = {
    id: null,
    news_title: '',
    news_description: '',
    label: null,
  };

  const [newsForQuiz, setNewsForQuiz] = useState(quizData);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = () => {
    Axios.get('http://127.0.0.1:8000/api/quiz/')
      .then((response) => {
        setNewsForQuiz(response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const checkAnswer = () => {
    if (selectedAnswer === '') {
      toast.error('Please select an answer!');
    } else if (newsForQuiz.label === true && selectedAnswer === 'True') {
      toast.success("You've predicted correctly!");
    } else if (newsForQuiz.label === false && selectedAnswer === 'False') {
      toast.success("You've predicted correctly!");
    } else {
      toast.warn("You've predicted wrongly");
    }
  };

  const getNewQuiz = () => {
    fetchQuizData();
    setSelectedAnswer('');
  };

  return (
    <>
      <Header activeContainer={stage} />
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-6">
        <h4 className="text-xl font-bold text-center mb-4">{newsForQuiz.news_title}</h4>
        <p className="text-gray-700 text-center mb-4">{newsForQuiz.news_description}</p>

        <div className="flex flex-col space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="True"
              name="quiz"
              className="form-radio h-5 w-5 text-blue-600"
              checked={selectedAnswer === 'True'}
              onChange={handleOptionChange}
            />
            <span className="text-lg">Real News</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="False"
              name="quiz"
              className="form-radio h-5 w-5 text-red-600"
              checked={selectedAnswer === 'False'}
              onChange={handleOptionChange}
            />
            <span className="text-lg">Fake News</span>
          </label>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={checkAnswer}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Ok
          </button>
          
          <button
            onClick={getNewQuiz}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
          >
            Get New Quiz
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default NewsQuiz;