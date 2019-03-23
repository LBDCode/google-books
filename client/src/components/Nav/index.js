import React from "react";
import "./style.css";


function Nav() {
  return (

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">MyLibrary</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/search">Search</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/saved">Saved</a>
          </li>
        </ul>
        <span class="navbar-text">
          Keep your reading list organized and up to date!
        </span>
      </div>
    </nav>
  );
}

export default Nav;





