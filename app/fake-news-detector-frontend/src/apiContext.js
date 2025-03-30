import React, { createContext, useContext } from "react";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const api_link = "http://127.0.0.1:8000";

  return (
    <ApiContext.Provider value={{ api_link }}>{children}</ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};

export { ApiProvider, ApiContext };
