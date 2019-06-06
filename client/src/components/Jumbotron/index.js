import React from "react";
import "./style.css";

export function Jumbotron({ children }) {
  return (
    <div className="jumbotron custom-jumbo" >
      {children}
    </div>
  );
};

export function SmallJumbotron({ children }) {
  return (
    <div className="jumbotron custom-small-jumbo" >
      {children}
    </div>
  );
};

