import React, { useState } from "react";
import Signup from "./authentication/Signup";
import Dashboard from "./Dashboard";
import Login from "./authentication/Login";
import { Container } from 'react-bootstrap';
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import MakePicks from "./MakePicks";
import Standings from "./Standings";
import CenteredContainer from "./authentication/CenteredContainer";
// import firebase from 'firebase/app';
import { auth, app, storage, db } from '../firebase';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';


function App() {
  // const [weeks, setWeeks] = useState([]);
  // const [user] = useAuthState(auth);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await db.collection("weeks").get()
  //     setWeeks(data.docs.map(doc => doc.data()));
  //   }
  //   fetchData()
  // }, [])
  // console.log(weeks);
  // return (
  //   <>
  //     {weeks.map(week => {
  //       return <li key={week.text}>{week.winner}</li>
  //     })}
  //   </>
  // )

  return (
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/make-picks" component={MakePicks} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/standings" component={Standings} />
          </Switch>
        </AuthProvider>
      </Router>
  )
    
}

export default App;