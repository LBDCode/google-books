import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import { GenModal, MessageModal } from "../components/Message";
import { Container } from "../components/Grid";
import StarRatingComponent from 'react-star-rating-component';
import API from "../utils/API";
import Fire from "../config/Firebase";


class Detail extends Component {
  state = {
    user: "guest@guest.com",
    userName: "Guest",
    book: {},
    rating: '',
    share: {
      title: "",
      author: "",
      link: "",
      imgLink: ""
    }
  };

  componentWillMount() {
    Fire.auth().onIdTokenChanged(user => {
      if (user && !Fire.auth().currentUser.isAnonymous) {
        this.setState({
          user: user.email
        });
      } else if (!user || Fire.auth().currentUser.isAnonymous) {
        this.setState({
          user: "guest@guest.com",
        });
      }
      this.loadBook();
    });  
  };

  loadBook() {
    API.getBook(this.state.user, this.props.match.params.id)
    .then(res => {
      console.log(res);
      this.setState({ book: res.data[0] });
    })
    .catch(err => console.log(err));
  };

  redirectAfterDelete() {
    this.props.history.push('/saved');
  };

  onStarClick(nextValue, prevValue, name) {
    var book = {...this.state.book};
    book.rating = nextValue
    this.setState({ book });
  };

  saveBook = ( p, s )=> {
    API.saveUserBook(
      this.state.user, this.state.book.googleID,
      {
      googleID: this.state.book.googleID,
      imageURL: this.state.book.imageURL,
      previewURL: this.state.book.previewURL,
      title: this.state.book.title,
      author: this.state.book.author,
      description: this.state.book.description,
      rating: this.state.book.rating
    })
      .then(res => this.loadBook())
      .catch(err => console.log(err));
  };

  onModalClick= (p) => {
    var share = {
      title: p.title,
      author: p.author,
      link: p.previewURL,
      imgLink: p.imageURL
    };
    this.setState( { share: share });
    this.toggleModal()
  };

  toggleModal = () => {
    this.setState( { showModal: !this.state.showModal })
  };

  clickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.toggleModal();
  }

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
          <GenModal
            clickAway={this.clickAway}
            modalRef={n => this.modalNode = n}  
          >
            <MessageModal
              share={this.state.share}
              user={this.state.userName}
            >
              <Button variant="outline-light" className="btn-dismiss" onClick={this.toggleModal}>X</Button> 
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
                  <button className="btn btn-custom btn-sm" onClick={this.saveBook}>Save</button>
                  <button className="btn btn-delete btn-sm" onClick={() => this.deleteBook(this.state.book)}>Delete</button>
                </span>
              </div>
            </div>
          </Col>
          <Col xs={{span: 6, order: 1}} md={{span: 4, order: 2}}>
            <img style={{marginTop: '20px', marginLeft: '10px', width: '110px', height: '155px'}} src={this.state.book.imageURL} alt="cover art"/>
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
