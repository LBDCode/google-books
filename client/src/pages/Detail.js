import React, { Component } from "react";
import { Link } from "react-router-dom";
import {browserHistory} from "react-router";
import { Col, Row, Container } from "../components/Grid";
import StarRatingComponent from 'react-star-rating-component';
import API from "../utils/API";

class Detail extends Component {
  state = {
    user: "guest@guest.com",
    userName: "Guest",
    book: {}
  };

  componentDidMount() {
    this.loadBook();
  }

  loadBook() {
    API.getBook(this.state.user, this.props.match.params.id)
    .then(res => this.setState({ book: res.data[0] }))
    .catch(err => console.log(err));
  };

  redirectAfterDelete() {
    this.props.history.push('/saved');
  };

  onStarClick(nextValue, prevValue, name) {
    var book = {...this.state.book};
    book.rating = nextValue
    console.log(book);
    this.setState({ book });
  };

  saveBook = ( p, s )=> {
    console.log(p, s);
    API.saveUserBook(
      this.state.user, p.googleID,
      {
      googleID: p.googleID,
      imageURL: p.image,
      title: p.title,
      author: p.author,
      description: p.description,
      rating: s
    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  deleteBook = p => {
    API.deleteBook(this.state.user, p.googleID)
      .then(res => this.redirectAfterDelete())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container  fluid>
        <div className="book-details" >
        <Row>
          <Col size="md-8 6" order="order-2 order-sm-1">
            <div style={{marginLeft: '10px'}}>
              <h3 className="book-title" >
                {this.state.book.title}
              </h3>
              <h5> 
                {this.state.book.author}
              </h5> 
              <StarRatingComponent
                  name={this.state.book.title} 
                  starCount={5}
                  value={this.state.book.rating}
                  onStarClick={this.onStarClick.bind(this)}
              />            
              <div style={{marginTop: '10px;'}}>
                <span>
                  <button className="btn btn-custom btn-sm" onClick={()=>this.saveBook(this.state.book, this.state.rating)}>Save</button>
                  <button className="btn btn-delete btn-sm" onClick={() => this.deleteBook(this.state.book)}>Delete</button>
                </span>
              </div>
            </div>
          </Col>
          <Col size="md-4 6" order="order-1 order-sm-2">
            <img style={{marginTop: '20px', marginLeft: '10px', width: '110px', height: '155px'}} src={this.state.book.imageURL}/>
            <p style={{marginTop: '20px'}}>
              <Link to="/saved">Back to saved books</Link>
            </p>
          </Col>          

        </Row>

        <Row>
          <Col size="md-12">
            <p style={{ marginTop: '20px', textIndent: '30px!important'}}>{this.state.book.description}</p>
          </Col>
        </Row>
        </div>
      </Container>
    );
  }
}

export default Detail;
