import { createContext, useState } from "react";

export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [isAuth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
