import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fire from './config/Firebase';
import Home from "./pages/Home";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isAnonymous: false
    };
  };


  componentDidMount() {
    this.authListener();
  };

  componentWillMount() {
    this.authListener();
    // this.anonymousCheck();
  };

  // anonymousCheck() {
  //   Fire.auth().onIdTokenChanged(user => {
  //     this.setState({ isAnonymous: user.isAnonymous });
  //   });
  // };

  authListener() {
    Fire.auth().onIdTokenChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
        localStorage.setItem("isAnonymous", user.isAnonymous);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("isAnonymous");
      }
    });
  };


  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={props =>
              <div>
                <Nav {...props}/>
                <Home {...props}/>
              </div> }
            />
            <Route exact path="/search" render={props =>
              <div>
                <Nav {...props}/>
                <Search {...props}/>
              </div> }
            />
            <Route exact path="/saved" render={props =>
              <div>
                <Nav {...props}/>
                <Saved {...props}/>
              </div> } 
            />
            <Route exact path="/books/:id" render={props =>
              <div>
                <Nav {...props}/>
                <Detail {...props}/>
              </div> } 
            />
            <Route render={props =>
              <NoMatch {...props}/>
            }
             />
          </Switch>
        </div>
      </Router>
    );
  
  }
}

export default App;