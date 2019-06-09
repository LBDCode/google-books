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
      <label for={props.id}>{props.placeholder}</label>
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
      <input className="form-check-input" type="checkbox" value="" id={props.id}/>
      <label className="form-check-label" for={props.id}>
        {props.text}
      </label>
    </div>  
  )
}


