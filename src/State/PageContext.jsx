import { createContext, useContext, useState } from "react";

const PageContext = createContext();

/**
 * Stores the current page number shared by the book grid and page buttons.
 *
 * @param {{ children: import("react").ReactNode }} props
 */
export function PageContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const values = {
    page,
    setPage,
  };
  return <PageContext.Provider value={values}>{children}</PageContext.Provider>;
}

/**
 * Reads and updates the current page number.
 *
 * @returns {{ page: number, setPage: import("react").Dispatch<import("react").SetStateAction<number>> }}
 */
export function usePageContext() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageContextProvider");
  }
  return context;
}
