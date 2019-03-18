import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav.js";
import Home from "./components/Home.js";
import SongsContainer from "./containers/SongsContainer.js";
import Popularity from "./components/Popularity.js";
import Genre from "./components/Genre.js";
import Profile from "./components/Profile.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route component={Nav} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/songs" component={SongsContainer} />
          <Route exact path="/songs/bypop" component={Popularity} />
          <Route exact path="/songs/bygenre" component={Genre} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;