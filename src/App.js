import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from './pages/Home'
import RegisterUser from './pages/RegisterUser'
import RegisterCoach from "./pages/RegisterCoach";
import LoginUser from "./pages/LoginUser";
import LoginCoach from "./pages/LoginCoach";
import CoachHome from "./pages/CoachHome";
import UserHome from "./pages/UserHome";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/">Home</Link>
          <div className="d-flex">
              Call us: +94 8984615613
          </div>
        </div>
      </nav>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={() => <Home user={user} setUser={setUser} />} />
          <Route path="/registerUser" component={() => <RegisterUser user={user} setUser={setUser} />} />
          <Route path="/registerCoach" component={() => <RegisterCoach user={user} setUser={setUser} />} />
          <Route path="/loginUser" component={() => <LoginUser user={user} setUser={setUser} />} />
          <Route path="/loginCoach" component={() => <LoginCoach user={user} setUser={setUser} />} />
          <Route path="/coachHome" component={() => <CoachHome user={user} />} />
          <Route path="/userHome" component={() => <UserHome user={user} />} />
        </Switch>
      </div>
    </Router>
  );
}
