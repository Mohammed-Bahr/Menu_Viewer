import { createContext, useContext } from "react";

export const AuthContext = createContext({
    FirstName: null,
    LastName: null,
    email: null,
    Password: null,
    isAuthenticated: false,
});
//export the useAuth as function because of 1- it is a react hook and hooks must start with use , be functions , follow rules of hooks 
export const useAuth = () => useContext(AuthContext);