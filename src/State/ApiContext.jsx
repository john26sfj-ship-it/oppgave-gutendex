import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export function ApiContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [baseUrl, setBaseUrl] = useState("https://gutendex.com/books");
  const values = {
    data,
    setData,
    baseUrl,
    setBaseUrl,
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
}

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within a ApiContextProvider");
  }
  return context;
}
