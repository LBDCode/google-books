import React, { Component } from "react";
import API from "../utils/API";
import { List, CardItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import "../style.css";


class Search extends Component {
  state = {
    books: [],
    results: [],
    search: "",
    user: "libby2@libby.com"
  };

  defaultImg = "https://mtf.plusrewards.com.au.mastercard.com/storage/documents/ebooks-default-img.svg";

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getUserBooks(this.state.user)
      .then(res =>
        this.setState({ books: res.data.favorites })
      )
      .catch(err => console.log(err));  
  };

  searchBooks = event => {
    event.preventDefault();
    API.searchBooks(this.state.search)
      .then(res => {
        this.filterResults();
        this.setState({results: res.data.items});
      })
      .catch(err => console.log(err))
  };

  filterResults = (id) => {
    let res = this.state.books.map(e => e.googleID);
    if (res.includes(id)) {
      return true
    } else {
      return false
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveBook = p => {
    API.saveUserBook(
      this.state.user, p.googleID,
      {
      googleID: p.googleID,
      title: p.title,
      author: p.author,
      description: p.description
    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
    
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    console.log(this.state.rating);
  }

  render() {
    return (
      <>
        <Jumbotron>
          <h1>Bibliofile</h1>
          <h4>Keep your reading list organized and up to date.</h4>
          <form className="form-inline" style={{justifyContent:"center", padding:"10px"}} >
              <Input 
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search"
              />
              <FormBtn
                disabled={!(this.state.search)}
                onClick={this.searchBooks}
                className="btn btn-dark my-2 my-sm-0"
              >
                Search
              </FormBtn>
          </form>
        </Jumbotron>
        <div className="container">
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
                    rating={!result.rating? 0 : result.rating}
                    rateBooks={this.onStarClick}
                    saveBook={this.saveBook}
                    saved={(this.filterResults(result.id))? "saved" : "not saved"}
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
