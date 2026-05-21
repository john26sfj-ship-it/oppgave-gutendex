import { createContext, useContext } from "react";

const MenuContext = createContext();

export function MenuContextProvider({ children, toggleMenu }) {
  return (
    <MenuContext.Provider value={{ toggleMenu }}>{children}</MenuContext.Provider>
  );
}

export function useMenuContext() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }

  return context;
}
