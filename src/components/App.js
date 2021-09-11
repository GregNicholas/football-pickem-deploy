import React from "react";
import Signup from "./authentication/Signup";
import Dashboard from "./Dashboard";
import Login from "./authentication/Login";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import MakePicks from "./MakePicks";
import NFLPicks from "./NFLPicks";
import Standings from "./Standings";
import HardcoreStandings from "./HardcoreStandings";

function App() {
  return (
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/make-picks" component={MakePicks} />
            <PrivateRoute path="/hardcore-picks" component={NFLPicks} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/standings" component={Standings} />
            <Route path="/hardcore-standings" component={HardcoreStandings} />
          </Switch>
        </AuthProvider>
      </Router>
  )
    
}

export default App;