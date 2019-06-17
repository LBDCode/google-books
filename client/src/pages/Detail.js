import React, { Component } from "react";
import { Link } from "react-router-dom";
import {browserHistory} from "react-router";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GenModal, MessageModal } from "../components/Message";
import { Container } from "../components/Grid";
import StarRatingComponent from 'react-star-rating-component';
import API from "../utils/API";

class Detail extends Component {
  state = {
    user: "guest@guest.com",
    userName: "Guest",
    book: {},
    sharePhone: '',
    shareEmail: '',
    // share: {
    //   title: "",
    //   author: "",
    //   link: ""
    // }
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
      previewURL: p.link,
      title: p.title,
      author: p.author,
      description: p.description,
      rating: s
    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  onModalClick= (p) => {
    var share = {...share};
    share = {
      title: p.title,
      author: p.author,
      link: p.link
    };
    this.setState( { share: share });
    this.toggleModal()
  };

  toggleModal = () => {
    this.setState( { showModal: !this.state.showModal })
    console.log(this.state.share, this.state.showModal);
  };

  deleteBook = p => {
    API.deleteBook(this.state.user, p.googleID)
      .then(res => this.redirectAfterDelete())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Container  fluid>
        {
          this.state.showModal ? 
          <GenModal>
            <MessageModal
              share={this.state.book}
            >
              <Button variant="outline-danger" onClick={this.toggleModal}>X</Button> 
            </MessageModal>
          </GenModal>
          :
          null
        }
        <div className="book-details" >
        <Row>
          <Col xs={{span: 6, order: 2}} md={{span: 8, order: 1}}>
            <div style={{marginLeft: '10px'}}>
              <h3 className="book-title" >
                {this.state.book.title}
                <span><i className="fas fa-share-alt share-icon"  onClick={() => this.onModalClick(this.state.book)}></i></span>
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
          <Col xs={{span: 6, order: 1}} md={{span: 4, order: 2}}>
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
