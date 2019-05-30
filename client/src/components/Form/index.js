import React from "react";
import "./style.css";


// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group" style={{justifyContent:"center"}} >
      <input className="form-control" {...props} />
    </div>
  );
}

export function LoginInput(props) {
  return (
    <div className="form-group">
      <label for={props.id}>{props.placeholder}</label>
      <input {...props} className="form-control"/>
    </div>

  );
}



export function FormBtn(props) {
  return (
    <button
      {...props}
    >
      {props.children}
    </button>
  );
}


