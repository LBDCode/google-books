import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import API from "../utils/API";
import Fire from "../config/Firebase";
import { List, CardItem } from "../components/List";
import {SmallJumbotron }from "../components/Jumbotron";
import { Input, FormBtn, CheckBox, CheckboxDiv, Collapse } from "../components/Form";
import { GenModal, MessageModal } from "../components/Message";
import DefaultImage from "./no_cover.jpg";
import "../style.css";


class Search extends Component {
  state = {
      books: [],
      results: [],
      search: "",
      filter: "",
      user: "guest@guest.com",
      userName: "Guest",
      showModal: false,
      share: {
        title: "",
        author: "",
        link: "",
        imgLink: ""
      }
    };

 
  componentDidMount() {
    Fire.auth().onAuthStateChanged(user => {
      if (user && !Fire.auth().currentUser.isAnonymous) {
        this.setState({
          user: user.email
        });
      } else if (!user || Fire.auth().currentUser.isAnonymous || user === null) {
        this.setState({
          user: "guest@guest.com"
        })
      }
      this.loadBooks()
    })
  };

  loadBooks = () => {
    API.getUserBooks(this.state.user)
      .then(res => {
        this.setState({ 
          userName: res.data.userName,
          books: res.data.favorites 
        });
      })
      .catch(err => console.log(err));  
  };

  searchBooks = event => {
    event.preventDefault();
    API.searchBooks(this.state.search, this.state.filter)
      .then(res => {
        this.filterResults();
        this.setState({results: res.data.results});
      })
      .catch(err => console.log(err))
  };

  filterResults = (id) => {
    //check if book already saved to user's account; if so, return true and rating
    let res = this.state.books.map(e => e.googleID);
    if (res.includes(id)) {
      let obj = this.state.books.filter(e => e.googleID === id);
      return {saved: true, stars: obj[0].rating}
    } else {
      return {saved: false, stars: 0}
    };
  };  

  handleInputChange = event => {
    const{ name, value } = event.target;

    this.setState({
      [name]: value
    });

  };

  reset = event => {
    event.preventDefault();
    this.setState({
      filter : "",
      search: ""
    });
  };

  onModalClick= (p) => {
    let share = {...this.state.share};
    share = {
      title: p.title,
      author: p.author[0],
      link: p.link, 
      imgLink: p.image
    };
    this.setState( { share: share })
    this.toggleModal()
  };

  clickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState( { showModal: !this.state.showModal })
  };

  saveBook = ( p, s )=> {
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

  deleteBook = p => {
    API.deleteBook(this.state.user, p.googleID)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {

    return (
      <>
        <SmallJumbotron>
          <h3 style={{color:"#fff", fontSize: "1.95rem"}}>Book Search</h3>
          <Form >
              <Input 
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search"
              />              
              <CheckboxDiv>
                <CheckBox
                  id="partial"
                  text="Preview available"
                  name="filter"
                  value="partial"
                  checked={this.state.filter === "partial"}
                  onChange={this.handleInputChange}
                >
                </CheckBox>
                <CheckBox
                  id="free-ebooks"
                  text="Free eBook available"
                  name="filter"
                  checked={this.state.filter === "free-ebooks"}
                  value="free-ebooks"
                  onChange={this.handleInputChange}
                >
                </CheckBox>
                <CheckBox
                  id="paid-ebooks"
                  text="eBook available for purchase"
                  name="filter"
                  checked={this.state.filter === "paid-ebooks"}
                  value="paid-ebooks"
                  onChange={this.handleInputChange}                >
                </CheckBox>
                </CheckboxDiv> 
              <div>
                <FormBtn
                disabled={!(this.state.search)}
                onClick={this.searchBooks}
                className="btn btn-success my-2 my-sm-0"
                style={{display:"inline", marginRight: "5px"}}
              >
                Search
              </FormBtn>
              <FormBtn
                disabled={(!(this.state.search) && (this.state.filter === ""))}
                onClick={this.reset}
                className="btn btn-danger my-2 my-sm-0"
                style={{display:"inline", marginRight: "5px"}}
              >
               Reset
              </FormBtn>
            </div>
          </Form>
        </SmallJumbotron>

        <div className="container">
          <div className="search-directions">
            <Collapse
              header="How to use the GoogleBooks API to find new, exciting literature."
            >
              <p><strong>Simple Search: </strong>enter a text string in the search box to find volumes that match.  You 
                can further refine your search by using keyword indicators and/or filters.</p>
              <p><strong>Keywords: </strong>use intitle, inauthor, and insubject (eg insubject:plants) to return 
              results where the text following the colon is found in the title, author, or subject.</p>
              <p><strong>Filters: </strong>use the radio buttons to restrict results to books that have a preview 
              or ebook available through GoogleBooks.</p>
            </Collapse>
          </div>
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
          <div>
            {!this.state.results.length ? (              
                <h3 className="results-message">No results to display</h3>
              ) : 
              (
              <List>
                {this.state.results.map(result => (
                  <CardItem
                    key={result.id + Math.floor(Math.random() * 10) + 1}
                    googleID={result.id}
                    link={result.volumeInfo.previewLink}
                    image={(!result.volumeInfo.imageLinks)? DefaultImage : result.volumeInfo.imageLinks.thumbnail}
                    title={result.volumeInfo.title}
                    author={result.volumeInfo.authors}
                    description={result.volumeInfo.description}
                    stars={(this.filterResults(result.id).stars)}
                    saveBook={this.saveBook}
                    deleteBook={this.deleteBook}
                    onModalClick={this.onModalClick}
                    saved={(this.filterResults(result.id).saved)? "saved" : "not saved"}
                  >
                  </CardItem>
                ))}
              </List>
            ) }
          </div>
        </div>  
      </>
    );
  }
}

export default Search;
