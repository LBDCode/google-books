import React, { Component } from 'react';
import API from "../../utils/API";
import { Navbar, NavListRight, RightListItem } from "../NavElems"
import { Modal } from "../Login";
import "./style.css";


class Nav extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      user: "libby",
    };
  };

  newUser = (email) => {
    console.log(email);
    // API.createUser(email)
    //   .then(res =>
    //     this.setState({ user: res.data })
    //   )
    //   .catch(err => console.log(err));  
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
            <RightListItem>
              <a className="nav-link cust-link" href="/search">search</a>
            </RightListItem>
            <RightListItem>
              <a className="nav-link cust-link" href="/saved">library</a>
            </RightListItem>
            <RightListItem>
              {this.state.user === "" ? 
                <a className="nav-link cust-link" href="#" data-toggle="modal" data-target="#loginModal">sign in</a>
              :
                <a className="nav-link cust-link" href="#" data-toggle="modal" data-target="#loginModal">sign out</a>
              }
            </RightListItem>
          </NavListRight>

          <Modal>
            <div className="modal-header">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Signup</a>
                  </li>
              </ul>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
                <div className="modal-body">


                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <form>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="button" className="btn btn-primary">Login</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Continue as Guest</button>
                      </form>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <form>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                          <label for="exampleInputPassword1">Re-enter Password</label>
                          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="button" class="btn btn-primary">Signup</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue as Guest</button>
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





