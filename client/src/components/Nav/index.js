import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Fire from "../../config/Firebase";
import API from "../../utils/API";
import { Navbar, NavListRight, NavListItem, NavListCenter } from "../NavElems"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import "./style.css";


class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      user: null,
      userName: "",
      loginEmail: "",
      loginPassword: "",
      signupEmail: "",
      signupPassword:"",
      signupName: "",
      show: false,
      key: 'login',
      message: ""
    };
  };


  componentDidMount() {
    this.authListener();
  };

  authListener() {
    Fire.auth().onAuthStateChanged(user => {
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
      if(res.data && res.data.userName){
        this.setState({
          userName: res.data.userName,
        })
      }
    })
    .catch(err => console.log(err));
  };

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
      .then(res => {
        if (res.user && res.user.email) {
          this.handleClose();
          this.setState({
            user: res.user.email,
          })
          this.setUserName();
          this.handleClose();
        }  
      })
      .catch(error => {
        this.setState({ message: error.message });
      });
  };

  handleGuest = event => {
    event.preventDefault();
    Fire.auth()
      .signInAnonymously()
      .then(res => {
        if(res.user.isAnonymous === true) {
          this.setState({
            userName: "Guest",
            user: "guest@guest.com"
          });
          this.handleClose();
        }
      })
      .catch(error => {
        this.setState({ message: error.message });
      });
  };

  handleSignUp = e => {
    e.preventDefault();
    this.setState({message: "Creating your Bibliofile account..."});
    Fire.auth()
      .createUserWithEmailAndPassword(this.state.signupEmail, this.state.signupPassword)
      .then(res => {
        if (res.user && res.user.email) {
          this.newUser();
        } 
      }) 
      .catch(error => {
        console.log(error)
        this.setState({ message: error.message });
      });
  };

  newUser = () => {
    const newUser = {"email": this.state.signupEmail, "userName": this.state.signupName};
    API.createUser(newUser)
      .then(res => {
        this.handleClose();
        this.setUserName();
      })
      .catch(err => console.log(err));
  };

  resetForm = () => {
    this.setState({
      loginEmail: "",
      loginPassword: "",
      signupEmail: "",
      signupPassword:"",
      signupName: "",
      message: ""
    })
  };

  handleClose = () => {
    this.resetForm();
    this.setState({
      show: false,
      key: "login"
    });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleRedirect = () => {
    this.props.history.push('/');
  };

  handleWelcome = () => {
    if(this.state.userName === "" || this.state.userName === "Guest") {
      return "Guest Account"
    } else {
      return `welcome back, ${this.state.userName}`
    }
  }

  render() {
    return (
      <Navbar>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
                <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse dual-nav w-50 order-0">
            <Link to={"/"} href="/" className="navbar-brand cust-text d-block order-0 order-md-1 ">Bibliofile</Link>
          </div>

          <NavListCenter>
            <h5 className="welcome-message">{this.handleWelcome()}</h5>
          </NavListCenter>

          <NavListRight>
            <NavListItem>
              <Link to={"/search"} className="nav-link cust-link" href="/search">search</Link>
            </NavListItem>
            <NavListItem>
              <Link to={"/saved"}className="nav-link cust-link" href="/saved">library</Link>
            </NavListItem>
            <NavListItem>
              {(this.state.user === null || this.state.user === "guest@guest.com") ?
                <Link to="" className="nav-link cust-link" onClick={this.handleShow}>sign in</Link>
              :
                <Link to="" className="nav-link cust-link" onClick={this.handleSignOut} >sign out</Link>
              }
            </NavListItem>
          </NavListRight>

          <Modal className="auth-modal" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="auth-title">{this.state.key ==="login"? "Login to your Account" : "Signup for Biobliofile"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
              >
                <Tab eventKey="login" title="Login">
                  <Form className="auth-form">
                    <Form.Group className="auth-input" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="loginEmail"
                        value={this.state.loginEmail}
                        onChange={this.handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="auth-input" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="loginPassword"
                        value={this.state.loginPassword}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>

                    <div className="d-flex flex-column auth-button-group">
                      <Button
                        className="auth-button"
                        variant="success"
                        type="submit"
                        onClick={this.handleLogin}
                      >
                        Signin
                      </Button>
                      <Button
                        className="auth-button"
                        variant="outline-secondary"
                        type="submit"
                        onClick={this.handleGuest}
                      >
                        Continue as Guest
                      </Button>
                    </div>
                    <Form.Text className="text-muted">
                      {this.state.message}
                    </Form.Text>
                  </Form>
                </Tab>
                <Tab eventKey="signup" title="Signup">
                  <Form className="auth-form">
                    <Form.Group className="auth-input" controlId="formSignupEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="signupEmail"
                        value={this.state.signupEmail}
                        onChange={this.handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="auth-input" controlId="formSignupName">
                      <Form.Control
                        type="text"
                        placeholder="User name"
                        name="signupName"
                        value={this.state.signupName}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="auth-input" controlId="formSignupPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="signupPassword"
                        value={this.state.signupPassword}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <div className="d-flex flex-column auth-button-group">
                      <Button
                        className="auth-button"
                        variant="success"
                        type="submit"
                        onClick={this.handleSignUp}
                      >
                        Signup
                      </Button>
                      <Button
                        className="auth-button"
                        variant="outline-secondary"
                        type="submit"
                        onClick={this.handleGuest}
                      >
                        Continue as Guest
                      </Button>
                  </div>
                  <Form.Text className="text-muted">
                    {this.state.message}
                  </Form.Text>
                  </Form>
                </Tab>
              </Tabs>

            </Modal.Body>
            {/* <Modal.Footer>
              <p>or</p>
              <Button variant="primary">Continue as Guest</Button>
            </Modal.Footer> */}
          </Modal>

          {/* <Modal>
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
          </Modal> */}
        </Navbar>
    )
  };
};


export default Nav;





