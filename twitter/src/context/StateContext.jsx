import { createContext, useState } from "react";

// Step 1: Create Context
export const StateContext = createContext(null);

// Step 2: Create Provider Component
export function StateProvider({ children }) {
    const [showNavbar, setShowNavbar] = useState(false);

  return (
    <StateContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </StateContext.Provider>
  );
}
