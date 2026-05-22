import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchContextProvider({ children }) {
  // Empty string means no search param in the Gutendex request.
  const [search, setSearch] = useState("");
  const values = {
    search,
    setSearch,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider",
    );
  }
  return context;
}
