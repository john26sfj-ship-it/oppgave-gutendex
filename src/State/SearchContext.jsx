import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

/**
 * Stores the submitted search text used by the Gutendex list query.
 *
 * @param {{ children: import("react").ReactNode }} props
 */
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

/**
 * Reads and updates the current search string.
 *
 * @returns {{ search: string, setSearch: import("react").Dispatch<import("react").SetStateAction<string>> }}
 */
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider",
    );
  }
  return context;
}
