import React, { createContext, useContext } from "react";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const api_link = process.env.REACT_APP_BACKEND_API_URL;

  console.log("------------->>>>>>>>>API URL:", api_link);

  return (
    <ApiContext.Provider value={{ api_link }}>{children}</ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};

export { ApiProvider, ApiContext };
