import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import Landing from "./shared/pages/Landing/Landing";
import UpdatePlace from "./places/pages/UpdatePlace";
import NavigationBar from "./shared/components/Navigation/NavigationBar";
import Auth from "./user/pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Landing />
      <div className="py-10 px-4 lg:px-32">
        <Switch>
          <Route exact path="/">
            <Users />
          </Route>
          <Route path="/:userId/places">
            <UserPlaces />
          </Route>
          <Route exact path="/places/new">
            <NewPlace />
          </Route>
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
