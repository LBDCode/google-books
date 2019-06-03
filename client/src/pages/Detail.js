import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    user: "libby2@libby.com",
    book: {}
  };

  componentDidMount() {
    API.getBook(this.state.user, this.props.match.params.id)
      // .then(res => console.log(res.data[0]))
      .then(res => this.setState({ book: res.data[0] }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.book.title} by {this.state.book.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Description</h1>
              <p>{this.state.book.description}</p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/saved">Back to your saved books</Link>
          </Col>
          <Col size="md-8"></Col>
          <Col size="md-2">
            <Link to="/search">Search for new books</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
