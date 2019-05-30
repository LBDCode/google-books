import React, { Component } from 'react';
import API from "../../utils/API";
import { Navbar, NavListRight, NavListItem } from "../NavElems"
import { Modal, ModalTabList } from "../Login";
import { LoginInput, FormBtn } from "../Form";
import "./style.css";


class Nav extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      user: "",
      loginEmail: "",
      loginPassword: "",
      signupEmail: "",
      signupPassword:""
    };
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    
  };

  newUser = (email) => {
    const newUser = {"email": email}
    API.createUser(newUser)
      .then(res =>
        this.setState({user: email})
      )
      .catch(err => console.log(err));  
  };

  render() {
    return (
      <Navbar>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
                <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse dual-nav w-50 order-1 order-md-0">
            <ul className="navbar-nav">
              <li className="navbar-text">
                Keep your reading list organized and up to date
              </li>
            </ul>
          </div>

          <a href="/" className="navbar-brand cust-text mx-auto d-block text-center order-0 order-md-1 w-25">MyLibrary</a>
          
          <NavListRight>
            <NavListItem>
              <a className="nav-link cust-link" href="/search">search</a>
            </NavListItem>
            <NavListItem>
              <a className="nav-link cust-link" href="/saved">library</a>
            </NavListItem>
            <NavListItem>
              {this.state.user === "" ? 
                <a className="nav-link cust-link" href="#" data-toggle="modal" data-target="#loginModal">sign in</a>
              :
                <a className="nav-link cust-link" href="#" data-toggle="modal" data-target="#loginModal">sign out</a>
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
                    <FormBtn type="button" className="btn btn-primary" id="loginBtn" onClick={() => this.newUser(this.state.loginEmail)}>Login</FormBtn>
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
                        id="signupPassword"
                        placeholder="Password"
                        type="password"
                        name="signupPassword"
                        value={this.state.signupPassword}
                        onChange={this.handleInputChange}
                      />
                    <FormBtn type="button" className="btn btn-primary" id="signupBtn">Sign Up</FormBtn>
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





