import "bootstrap/dist/css/bootstrap.min.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Allposts from "./components/AllPosts";
import AppNavbar from "./components/AppNavbar";
import { Container } from "reactstrap";
import Home from "./components/Home";
import Profile from "./components/profile/Profile";
import Register from "./components/Register";
import { loadUser } from "./actions/AuthActions";
import store from "./store/store";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Router>
      <div className="App">
        <Register />
        <div className="content">
          <AppNavbar />
          <Container>
            <Switch>
             
              <Route path="/api/posts" component={Allposts} />
              <Route path="/api/users/:username" exact component={Profile} />       
              <Route path="/" component={Home} />
            </Switch>
          </Container>
        </div>
    
      </div>
    </Router>
  );
}

export default App;
