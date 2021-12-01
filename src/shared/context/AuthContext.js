import { createContext } from "react"; 

export const AuthContext = createContext({
    isLoggedIn: false,
    userInstance: null,
    token: null,
    login: () => {},
    logout: () => {}
});