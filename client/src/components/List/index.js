import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';
import "./style.css";

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group list unstyled">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}

export class CardItem extends Component {
  constructor(props) {
    super(props);
 
    this.onStarClick = this.onStarClick.bind(this);

    this.state = {
      book: props,
      rating: props.stars,
    };
  }


  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  };


  render() {
    const { rating } = this.state;
    const props = this.props;

    return (
      <li className="media">
        <img src={props.image} className="mr-3 src-img" alt="..."/>
        <div className="media-body">
            <h5 className="mt-0 mb-1">
              {(!props.title) ? "" : props.title } 
              <span><i className="fas fa-share-alt share-icon"  onClick={() => props.onModalClick(props)}></i></span>
            </h5>
            <h6>{(!props.author) ? "Author unknown" : props.author.map(auth => (auth + " "))}</h6> 
            <a href={props.link} target="blank"><button className="btn btn-custom btn-sm">Preview</button></a>
            {(props.saved === "not saved") ? 
              <button className="btn btn-custom btn-sm" onClick={()=>props.saveBook(props, this.state.rating)}>Save</button>
              :  
              <button className="btn btn-delete btn-sm" onClick={() => props.deleteBook(props)}>Delete</button>
            } 
            <div>
              <StarRatingComponent
                name={props.title} 
                starCount={5}
                value={rating}
                onStarClick={this.onStarClick}
              />
            </div>
            <p>{(!props.description) ? "" : props.description}</p>
        </div>

      </li>
    );

  }
}
