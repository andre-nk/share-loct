import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [userInstance, setUserInstance] = useState(null);

  const login = useCallback((id, name, token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userInstance",
      JSON.stringify({
        id,
        token,
        name,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserInstance({
      id,
      name,
    });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserInstance(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userInstance");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("userInstance"));
    console.log(storedToken);
    if (
      storedToken &&
      storedToken.token &&
      new Date(storedToken.expiration) > new Date()
    ) {
      login(
        storedToken.id,
        storedToken.name,
        storedToken.token,
        new Date(storedToken.expiration)
      );
    }
  }, [login]);

  return { userInstance, token, login, logout };
};
