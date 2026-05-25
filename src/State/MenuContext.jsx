import { createContext, useContext } from "react";

const MenuContext = createContext();

/**
 * Shares the header menu toggle with nested header controls.
 *
 * @param {{ children: import("react").ReactNode, toggleMenu: () => void }} props
 */
export function MenuContextProvider({ children, toggleMenu }) {
  return (
    <MenuContext.Provider value={{ toggleMenu }}>{children}</MenuContext.Provider>
  );
}

/**
 * Reads the header menu toggle function.
 *
 * @returns {{ toggleMenu: () => void }}
 */
export function useMenuContext() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }

  return context;
}
