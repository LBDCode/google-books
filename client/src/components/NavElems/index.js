import React from "react";
import "./style.css";


export function Navbar({ children }) {
    return (
        <nav className="navbar navbar-dark navbar-expand-md cust-nav justify-content-between">
        {children}
        </nav>
    );
}

export function NavListRight({ children }) {
    return (
      <div className="navbar-collapse collapse dual-nav w-50 order-2">
        <ul className="nav navbar-nav ml-auto"> {children}</ul>
      </div>  

    );
}

export function NavListItem({ children}) {
    return (
        <li className="nav-item">{children}</li>
    )

}

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

