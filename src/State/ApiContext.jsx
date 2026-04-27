import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export function ApiContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [callUrl, setCallUrl] = useState("https://gutendex.com/books");
  const handleData = (data) => {
    setData(data);
  };
  const handleCallUrl = (url) => {
    setCallUrl(url);
  };
  const values = {
    data,
    handleData,
    callUrl,
    handleCallUrl,
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
}

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within a ApiContextProvider");
  }
  return useContext(ApiContext);
}
