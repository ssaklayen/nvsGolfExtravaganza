import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import GolferList from "./components/golfer-list.component";
import AddGolfer from "./components/add-golfer.component";
import EditGolfer from "./components/edit-golfer.component";

import logo from "./images/golf-player.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <img className="navlogoCustom" src={logo} width="30" height="30" alt="Golf Player Icon" />
              <Link to="/" className="navbar-brand">
                NVS Golf Extravaganza 2022
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/add" className="nav-link">
                      Add Golfers
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/edit" className="nav-link">
                      Edit Golfers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <br />
          <Routes>
            <Route path="/" element={<GolferList />} exact />
            <Route path="/add" element={<AddGolfer />} />
            <Route path="/edit" element={<EditGolfer />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;

// <a href="https://www.flaticon.com/free-icons/golf" title="golf icons">Golf icons created by Vaadin - Flaticon</a>
