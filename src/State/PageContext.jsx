import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export function PageContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const values = {
    page,
    setPage,
  };
  return <PageContext.Provider value={values}>{children}</PageContext.Provider>;
}
export function usePageContext() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageContextProvider");
  }
  return context;
}
