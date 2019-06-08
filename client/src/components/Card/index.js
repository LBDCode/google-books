import React from "react";
import "./style.css";


// This file exports the Input, TextArea, and FormBtn components



export function Card(props) {
    var cls = 'fas fa-'+ props.icon;
    // "<i className='fas fa-search'></i>"
  return (
    <div className="card home-card" >
        <div className="card-body" >
            <h4 className="card-title" style={{textAlign: "center"}}>
                {props.title}
            </h4>
            <p className="card-text">{props.text}</p>
            <h2 style={{textAlign: "center"}}><i className={cls} style={{textAlign: "center", fontSize: '46px'}}></i></h2>
        </div>
    </div>
  );
};

