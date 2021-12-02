import { Helmet } from "react-helmet";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import Landing from "./shared/pages/Landing/Landing";
import UpdatePlace from "./places/pages/UpdatePlace";
import { AuthContext } from "./shared/context/AuthContext";
import NavigationBar from "./shared/components/Navigation/NavigationBar";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { userInstance, token, login, logout } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Helmet>
            <meta charSet="utf-8" />
            <title>ShareLoct - Home</title>
          </Helmet>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <Helmet>
            <meta charSet="utf-8" />
            <title>ShareLoct</title>
          </Helmet>
          <UserPlaces />
        </Route>
        <Route path="/places/new">
          <Helmet>
            <meta charSet="utf-8" />
            <title>ShareLoct - New Place</title>
          </Helmet>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <Helmet>
            <meta charSet="utf-8" />
            <title>ShareLoct - Update Place</title>
          </Helmet>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <Helmet>
            <meta charSet="utf-8" />
            <title>ShareLoct - Home</title>
          </Helmet>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <Helmet>
            <meta charSet="utf-8" />
            <title>ShareLoct</title>
          </Helmet>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Helmet>
            <meta charSet="utf-8" />
            <title>ShareLoct - Auth</title>
          </Helmet>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userInstance: userInstance,
        login,
        logout,
      }}
    >
      <BrowserRouter>
        <NavigationBar />
        <Landing />
        <div className="py-10 px-8 lg:px-32">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
