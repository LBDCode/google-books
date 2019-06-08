import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={props =>
            <div>
              <Nav />
              <Home />
            </div> }
          />
          <Route exact path="/search" render={props =>
            <div>
              <Nav />
              <Search />
            </div> }
          />
          <Route exact path="/saved" render={props =>
            <div>
              <Nav />
              <Saved />
            </div> } 
          />
          <Route exact path="/books/:id" render={props =>
            <div>
              <Nav />
              <Detail {...props}/>
            </div> } 
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;