
import React, { Component } from "react";
import {Jumbotron, SmallJumbotron} from "../components/Jumbotron";
import {Card} from "../components/Card";
import { Col, Row, Container } from "../components/Grid";
import "../style.css";


class Home extends Component {
  state = {
    books: [],
    results: [],
    search: "",
    user: "guest@guest.com",
    userName: "Guest"
  };

  render() {
    return (
      <>
        <Jumbotron>
          <h1>Bibliofile</h1>
          <h4>Keep your reading list organized and up to date.</h4>
          <div className="home-buttons">
              <span>
                  <button className="btn btn-home" onClick={ () => this.props.history.push('/search') }>Get Started</button>
              </span>
          </div>
        </Jumbotron>
        <Container fluid>
          <div className="home-message">
            <Row>
              <Col size="md-4">
                <Card
                  title="Explore"
                  icon="search"
                  text="Use the GoogleBooks API to explore over 25 million indexed volumes. Search by title, author, or subject."
                />
              </Col> 
              <Col size="md-4">
                <Card
                  title="Track"
                  icon="book-open" 
                  text="Build a personal library of the books you've read or want to read.  Rate your past reads."
                />
              </Col>   
              <Col size="md-4">
                <Card
                  title="Share"
                  icon="share-alt"
                  text="Found a book you want to share with the world?  Text/email reading suggestions to fellow bibliophiles."
                />
              </Col>    
            </Row>
            <Row>
              <Col size="12">
                <blockquote className="blockquote text-center home-about">
                  <p className="mb-0">Read. Read anything. Read the things they say are good for you, 
                  and the things they claim are junk. You’ll find what you need to find. Just read </p>
                  <footer className="blockquote-footer">Neil Gaiman</footer>
                </blockquote>
              </Col>           
            </Row>

          </div>
        </Container>

      </>
    );
  }
}

export default Home;
