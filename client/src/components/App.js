import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Navbar";
import Login from "../pages/Login";
import Sports from "../pages/Sportspage";
import Blog from "./Blogpage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/Login">
          </Route>
          <Route path="/Sports">
            <Sports />
          </Route>
          <Route path="/Blog">
            <Blog />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;

  