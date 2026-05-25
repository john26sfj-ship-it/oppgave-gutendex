import { createContext, useContext, useState } from "react";

const CategoriesContext = createContext();

/**
 * Stores the selected Gutendex topic/category for the whole app.
 *
 * @param {{ children: import("react").ReactNode }} props
 */
export function CategoriesContextProvider({ children }) {
  // Empty string means no topic filter in the Gutendex request.
  const [category, setCategory] = useState("");
  const values = {
    category,
    setCategory,
  };
  return (
    <CategoriesContext.Provider value={values}>
      {children}
    </CategoriesContext.Provider>
  );
}

/**
 * Reads and updates the selected category.
 *
 * @returns {{ category: string, setCategory: import("react").Dispatch<import("react").SetStateAction<string>> }}
 */
export function useCategoriesContext() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategoriesContext must be used within a CategoriesContextProvider",
    );
  }
  return context;
}
