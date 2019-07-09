import React from "react";
import "./style.css";


// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group" style={{justifyContent:"center", maxWidth:"700px", margin:"10px 0"}} >
      <input className="form-control" {...props} />
    </div>
  );
};

export function LoginInput(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.placeholder}</label>
      <input {...props} className="form-control"/>
    </div>
  );
};

export function FormBtn(props) {
  return (
    <button
      {...props}
    >
      {props.children}
    </button>
  );
};

export function CheckboxDiv(props) {
  return (

    <div className="filters" >
        {props.children}
    </div>
  )
}

export function CheckBox(props) {
  return(
    <div className="form-check">
      <input className="form-check-input" type="radio" {...props}/>
      <label className="form-check-label" htmlFor={props.id}>{props.text}</label>
    </div>
  )
}

export function Collapse(props) {
  return(
    <div className="collapse-wrapper">
      <h4 className="collapse-header">
        <span className="collapse-toggle" data-toggle="collapse" href="#search-collapse" role="button" aria-expanded="false" aria-controls="search-collapse">
        <i className="fas fa-plus"></i>
        </span>
        {props.header}
      </h4>
      <div className="collapse" id="search-collapse">
        <div className="card card-body collapse-body">
          {props.children}
        </div>
      </div>
    </div>
  );
}


