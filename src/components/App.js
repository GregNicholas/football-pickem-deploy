import React, { useEffect } from "react";
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
import {ScheduleContextProvider} from "../contexts/ScheduleContext";

function App() {
  // const [weekData, setWeekData] = useState([]);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await db.collection(schedule).get()
  //     setWeekData(data.docs.map(doc => doc.data()));
  //   }
  //   fetchData()
  // }, [])

  // console.log(weekData)

  return (
      <Router>
        <AuthProvider>
          <ScheduleContextProvider>
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
          </ScheduleContextProvider>
        </AuthProvider>
      </Router>
  )
    
}
// {/* <ScheduleContext.Provider value={{ weekData }}>
// </ScheduleContext.Provider> */}

export default App;