import React from "react";
import { Col, Row, Container } from "../components/Grid";
import {Jumbotron} from "../components/Jumbotron";
import image from "./404.png";
import "./style.css";


function NoMatch() {
  return (
    <div className="no-match">
        <h3>Page not Found</h3>
        <button className="btn btn-home" onClick={ () => this.props.history.push('/home') }>Get back on track</button>

    </div>
  );
}

export default NoMatch;
