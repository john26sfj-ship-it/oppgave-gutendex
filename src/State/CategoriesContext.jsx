import { createContext, useContext, useState } from "react";

const CategoriesContext = createContext();
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

export function useCategoriesContext() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategoriesContext must be used within a CategoriesContextProvider",
    );
  }
  return context;
}
