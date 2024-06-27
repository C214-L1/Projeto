"use client";
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface IAuth {
  isAuthenticated: boolean;
  jwt: string;
}

interface IAuthContext {
  authenticationStatus: IAuth;
  setAuthenticationStatus: Dispatch<SetStateAction<IAuth>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  const [authenticationStatus, setAuthenticationStatus] = useState<IAuth>({
    isAuthenticated: false,
    jwt: "",
  });

  useLayoutEffect(() => {
    console.log(token);

    fetch("http://localhost:7777/check", {
      body: JSON.stringify({
        token,
      }),
      method: "POST",
    }).then((res) => {
      if (res.status == 200) {
        setAuthenticationStatus({ isAuthenticated: true, jwt: token! });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticationStatus, setAuthenticationStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  try {
    const authContext = useContext(AuthContext);
    return authContext;
  } catch (error) {
    console.log(error);
  }
}
