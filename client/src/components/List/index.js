import React from "react";
import Stars from '../Stars';
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

export function CardItem(props) {

  return (
      <li className="media">
        <img src={props.image} className="mr-3" alt="..."/>
        <div className="media-body">
            <h5 className="mt-0 mb-1">{(!props.title) ? "" : props.title }</h5>
            <h6>{(!props.author) ? "Author unknown" : props.author.map(auth => (auth + " "))}</h6>  
            <Stars
              name={props.title}
              value={props.rating}
              rateBooks={props.rateBooks}
            />
            <p>{(!props.description) ? "" : props.description}</p>
        </div>
        <a href={props.link} target="blank"><button>View</button></a>
        {(props.saved === "not saved") ? <button onClick={()=>props.saveBook(props)}>Save</button>
        :  <span tabIndex="0"> saved to library</span>}

      </li>
  );
}
