import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group" style={{justifyContent:"center"}} >
      <input className="form-control" {...props} />
    </div>
  );
}


export function FormBtn(props) {
  return (
    <button
      {...props}
      className="btn btn-dark my-2 my-sm-0"
    >
      {props.children}
    </button>
  );
}


