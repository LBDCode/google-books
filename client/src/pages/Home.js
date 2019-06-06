
import React, { Component } from "react";
import API from "../utils/API";
import { List, CardItem } from "../components/List";
import {Jumbotron, SmallJumbotron} from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import "../style.css";


class Home extends Component {
  state = {
    books: [],
    results: [],
    search: "",
    user: "libby2@libby.com",
  };

  defaultImg = "https://mtf.plusrewards.com.au.mastercard.com/storage/documents/ebooks-default-img.svg";

  render() {
    return (
      <>
        <Jumbotron>
          <h1>Bibliofile</h1>
          <h4>Keep your reading list organized and up to date.</h4>
          <div className="home-buttons">
              <span>
                  <button className="btn btn-custom" onClick={() => this.signIn()} >Sign In</button>
                  <button className="btn btn-custom" onClick={ () => this.props.history.push('/search') }>Continue As Guest</button>
              </span>
          </div>
        </Jumbotron>
        <Container fluid>
          <div className="home-message">
            <Row>
              <Col size="md-12">
                <div className="message main-message">
                  <h4>Find your next beach read.</h4>
                </div>
              </Col>          
            </Row>
            <Row>
              <Col size="md-6">
                <div style={{height: "100px"}}>
                  Find your next beach read.
                </div>
              </Col> 
              <Col size="md-6">
                <div style={{height: "100px"}}>
                  Find your next beach read.
                </div>
              </Col>          
            </Row>
          </div>
        </Container>

      </>
    );
  }
}

export default Home;
