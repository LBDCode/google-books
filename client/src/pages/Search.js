import React, { Component } from "react";
import API from "../utils/API";
import { List, CardItem } from "../components/List";
import {SmallJumbotron }from "../components/Jumbotron";
import { Input, FormBtn, CheckBox, CheckboxDiv } from "../components/Form";
import "../style.css";


class Search extends Component {
  state = {
    books: [],
    results: [],
    search: "",
    filter: "",
    user: "libby2@libby.com",
  };

  defaultImg = "https://mtf.plusrewards.com.au.mastercard.com/storage/documents/ebooks-default-img.svg";

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getUserBooks(this.state.user)
      .then(res => {
        this.setState({ books: res.data.favorites });
      }
      )
      .catch(err => console.log(err));  
  };

  setSearchFilter = () => {
    this.setState( {filter: "free-ebooks"});
    console.log(this.state.filter);
  };

  searchBooks = event => {
    event.preventDefault();
    API.searchBooks(this.state.search, this.state.filter)
      .then(res => {
        this.filterResults();
        this.setState({results: res.data.items});
      })
      .catch(err => console.log(err))
  };

  filterResults = (id) => {
    let res = this.state.books.map(e => e.googleID);
    if (res.includes(id)) {
      let obj = this.state.books.filter(e => e.googleID === id);
      return {saved: true, stars: obj[0].rating}
    } else {
      return {saved: false, stars: 0}
    };
  };  

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveBook = ( p, s )=> {
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
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <>
        <SmallJumbotron>
          <h3 style={{color:"#fff"}}>Book Search</h3>
          <form >
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
                  onChange={this.setSearchFilter}
                >
                </CheckBox>
                <CheckBox
                  id="free-ebooks"
                  text="Free eBook available"
                  onChange={this.setSearchFilter}

                >
                </CheckBox>
                <CheckBox
                  id="paid-ebooks"
                  text="eBook available for purchase"
                  onChange={this.setSearchFilter}
                >
                </CheckBox>
                </CheckboxDiv>
              <FormBtn
                disabled={!(this.state.search)}
                onClick={this.searchBooks}
                className="btn btn-success my-2 my-sm-0"
                style={{display:"block"}}
              >
                Search
              </FormBtn>
          </form>
        </SmallJumbotron>

        <div className="container">
          <div>
            <h4 style={{color: "#495057", marginTop:"20px", textAlign: 'center'}}>How to use the GoogleBooks API to find new, exciting literature.</h4>
            <strong>Simple Search: </strong> <br/>
            <strong>Keywords: </strong>use intitle, inauthor, and insubject (eg insubject:plants) to return results where the text following 
            the colon is found in the title, author, or subject.<br/>
            <strong>Filters: </strong>use the checkboxes to restrict results to books that have a preview or ebook available through GoogleBooks.
          </div>
          <div>
            {this.state.results.length ? (
              <List>
                {this.state.results.map(result => (
                  <CardItem
                    key={result.id}
                    googleID={result.id}
                    link={result.volumeInfo.previewLink}
                    image={(!result.volumeInfo.imageLinks)? this.defaultImg : result.volumeInfo.imageLinks.thumbnail}
                    title={result.volumeInfo.title}
                    author={result.volumeInfo.authors}
                    description={result.volumeInfo.description}
                    stars={(this.filterResults(result.id).stars)}
                    saveBook={this.saveBook}
                    deleteBook={this.deleteBook}
                    saved={(this.filterResults(result.id).saved)? "saved" : "not saved"}
                  >
                  </CardItem>
                ))}
              </List>
            ) : (
              <h3 className="results-message">No results to display</h3>
            )}
          </div>
        </div>  
      </>
    );
  }
}

export default Search;
