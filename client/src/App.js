import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/navbar/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard"; //New dahsboard page
// import Profile from "./components/Profile/Profile";
import Rewards from "./components/rewards/RewardsForm";
import HouseholdMemberForm from "./components/householdmembers/HouseholdMemberForm";

// TEMPLATE component!
// To access, log into the the app and go to: http://localhost:3000/template 
import Template from "./components/Template";
import ChoreListDemo from "./components/chorelist-demo/ChoreListDemo";
import DropDownDemo from "./components/chorelist-demo/DropDownDemo";
import GameBox from "./components/game/GameBox";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/rewards" component={Rewards} />
              <PrivateRoute exact path="/householdmembers" component={HouseholdMemberForm} />
              
              {/* TEMPLATE ROUTES */}
              <PrivateRoute exact path="/template" component={Template} />
              <PrivateRoute exact path="/chorelistdemo" component={ChoreListDemo} />
              <PrivateRoute exact path="/dropdowndemo" component={DropDownDemo} />
              <PrivateRoute exact path="/connectchoregame" component={GameBox} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
