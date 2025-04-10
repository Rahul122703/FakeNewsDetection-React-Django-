import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Home from './components/home';
import CheckByTitle from './components/checkbytitle';
import CategoryContainer from './components/category';
import ImageUpload from './components/imagedetection';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/checkbytitle',
    element: <CheckByTitle />,
  },

  {
    path: '/category/:category',
    element: <CategoryContainer />,

  },
  {
    path: '/checkbyimage',
    element: <ImageUpload />,

  }
]);

function App() {

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
