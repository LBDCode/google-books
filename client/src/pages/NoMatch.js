import React, { Component } from "react";
import "./style.css";


class NoMatch extends Component {

  render() {
    return (
      <div className="no-match">
        <div className="no-match-message">
          <h3 className="no-match-text-large">Page not Found</h3>
          <p className="no-match-text-small">let's get you back on track</p>
          <button className="btn btn-home" onClick={ () => this.props.history.push('/') }>Home</button>
        </div>
      </div>
    )
  }
}

export default NoMatch;
