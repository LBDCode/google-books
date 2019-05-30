import React from "react";
import "./style.css";

function Jumbotron({ children }) {
  return (
    <div className="jumbotron custom-jumbo" >
      {children}
    </div>
  );
}

export default Jumbotron;

