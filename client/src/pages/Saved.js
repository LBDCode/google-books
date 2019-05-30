import React, { Component } from "react";
import { DeleteBtn } from "../components/DeleteBtn";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";

class Saved extends Component {
    state = {
      books: [],
      results: [],
      search: "",
      user: "libby2@libby.com"
    };
  
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
  
    deleteBook = id => {
      API.deleteBook(this.state.user, id)
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    };

    render() {
      return (
        <>
            <Jumbotron>
                <h1>User Library</h1>
                <h4>View books you've already saved.</h4>
            </Jumbotron>
            <div>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book.googleID}>
                      <Link to={"/books/" + book.googleID}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteBook(book.googleID)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>  
        </>
      );
    }
  }
  
  export default Saved;
  
