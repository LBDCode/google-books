import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {browserHistory} from "react-router";
import Fire from "../../config/Firebase";
import API from "../../utils/API";
import { Navbar, NavListRight, NavListItem } from "../NavElems"
import { Modal, ModalTabList } from "../Login";
import { LoginInput, FormBtn } from "../Form";
import "./style.css";
import fire from '../../config/Firebase';


class Nav extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      user: null,
      userName: "",
      loginEmail: "",
      loginPassword: "",
      signupEmail: "",
      signupPassword:"",
      signupName: ""
    };
  };


  componentDidMount() {
    this.authListener();

  };

  authListener() {
    Fire.auth().onIdTokenChanged(user => {
      if (user && !Fire.auth().currentUser.isAnonymous) {
        this.setState({
          user: user.email
        });
        this.setUserName();
      } else if (!user || Fire.auth().currentUser.isAnonymous) {
        this.setState({
          user: "guest@guest.com",
          userName: "Guest"
        });
      }
    });  
  };

  setUserName = ()=> {
    API.getUserBooks(this.state.user)
    .then(res => {
      this.setState({
        userName: res.data.userName,
      })
    })
    .catch(err => console.log(err)); 
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    
  };

  handleSignOut = event => {
    event.preventDefault();
    Fire.auth()
      .signOut()
      .then(res => {
        this.setState({
          user: "guest@guest.com",
          userName: "Guest"
        })
      })
      .catch(error => {
        console.log(error)
      });
    this.handleRedirect(event);
  };

  handleLogin = event => {
    event.preventDefault();
    Fire.auth()
      .signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
      .then(this.setState({ 
        user: this.state.loginEmail,
      }))
      .then(this.setUserName())
      .catch(error => {
        this.setState({ logInError: error.message });
      });
  };

  handleGuest = event => {
    event.preventDefault();
    Fire.auth()
      .signInAnonymously()
      .then()
      .catch(error => {
        this.setState({ logInError: error.message });
      });
  };

  handleSignUp = e => {
    e.preventDefault();
    Fire.auth()
      .createUserWithEmailAndPassword(this.state.signupEmail, this.state.signupPassword)
      .then(res =>{
        this.newUser()
      })
      .catch(error => {
        console.log(error)
        // this.setState({ signUpError: error.message });
      });
  };

  handleRedirect = () => {
      this.props.history.push('/');
  }

  newUser = (email, userName) => {
    const newUser = {"email": this.state.signupEmail, "userName": this.state.signupName};
    console.log(newUser);
    API.createUser(newUser)
      .then(res => {
        console.log(res);
        this.setState({user: this.state.signupEmail, userName: this.state.signupName})
      })
      .catch(err => console.log(err));  
  };

  render() {
    return (
      <Navbar>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
                <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse dual-nav  order-1 order-md-0">
            <Link to={"/"} href="/" className="navbar-brand cust-text d-block order-0 order-md-1 ">Bibliofile</Link>
          </div>

          <NavListRight>
            <NavListItem>
              <Link to={"/search"} className="nav-link cust-link" href="/search">search</Link>
            </NavListItem>
            <NavListItem>
              <Link to={"/saved"}className="nav-link cust-link" href="/saved">library</Link>
            </NavListItem>
            <NavListItem>
              {(this.state.user === null || this.state.user === "guest@guest.com") ? 
                <Link className="nav-link cust-link" data-toggle="modal" data-target="#loginModal">sign in</Link>
              :
                <Link to="" className="nav-link cust-link" onClick={this.handleSignOut} >sign out</Link>
              }
            </NavListItem>
          </NavListRight>

          <Modal>
            <div className="modal-header">
              <ModalTabList>
                <NavListItem>
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Login</a>
                </NavListItem>
                <NavListItem>
                  <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Signup</a>
                </NavListItem>
              </ModalTabList>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <form>
                    <LoginInput
                      id="loginEmail"
                      placeholder="Email"
                      type="email"
                      name="loginEmail"
                      value={this.state.loginEmail}
                      onChange={this.handleInputChange}
                    />
                    <LoginInput
                      id="loginPassword"
                      placeholder="Password"
                      type="password"
                      name="loginPassword"
                      value={this.state.loginPassword}
                      onChange={this.handleInputChange}
                    />
                    <FormBtn type="button" className="btn btn-primary" id="loginBtn" onClick={this.handleLogin}>Login</FormBtn>
                    <FormBtn type="button" className="btn btn-secondary" id="guestBtn" data-dismiss="modal">Continue as Guest</FormBtn>
                  </form>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <form>
                      <LoginInput
                          id="signupEmail"
                          placeholder="Email"
                          type="email"
                          name="signupEmail"
                          value={this.state.signupEmail}
                          onChange={this.handleInputChange}
                        /> 
                        <LoginInput
                        id="signupName"
                        placeholder="User Name"
                        name="signupName"
                        value={this.state.signupName}
                        onChange={this.handleInputChange}
                      />
                      <LoginInput
                        id="signupPassword"
                        placeholder="Password"
                        type="password"
                        name="signupPassword"
                        value={this.state.signupPassword}
                        onChange={this.handleInputChange}
                      />
                    <FormBtn type="button" className="btn btn-primary" id="signupBtn" onClick={this.handleSignUp}>Signup</FormBtn>
                    <FormBtn type="button" className="btn btn-secondary" id="guestBtn" data-dismiss="modal">Continue as Guest</FormBtn>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </Navbar>
    )
  };
};


export default Nav;





