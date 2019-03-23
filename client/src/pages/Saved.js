import React, { Component } from "react";
import { DeleteBtn } from "../components/DeleteBtn";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import { List, ListItem, CardItem } from "../components/List";

class Saved extends Component {
    state = {
      books: [],
      results: [],
      search: ""
    };
  
    componentDidMount() {
      this.loadBooks();
    }
  
    loadBooks = () => {
      API.getBooks()
        .then(res =>
          this.setState({ books: res.data })
        )
        .catch(err => console.log(err));  
    };
  
    deleteBook = id => {
      API.deleteBook(id)
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    };

    render() {
      return (
        <Container fluid>
            <Jumbotron>
                <h1>User Library</h1>
                <h4>View books you've already saved.</h4>
            </Jumbotron>
            <div>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <Link to={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>  
        </Container>
      );
    }
  }
  
  export default Saved;
  
