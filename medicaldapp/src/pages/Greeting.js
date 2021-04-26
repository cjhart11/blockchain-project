import React, { Component } from "react";
import logo from '../images/medicaldrugicon.jpg';
class Greeting extends Component {
  render() {
    const imgStyle = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%"
    };

    return (
      <div>
        <br />
        <h2 style={{ color: "Black", textAlign: "center" }}>
          {" "}
          Welcome to Jonathan and Conor's <b> Blockchain</b> project
        </h2>
        <br />
        <img src={logo} style={imgStyle} width="400px" alt="Medical icon" />
        <br /> <br />
        <p style={{ textAlign: "center" }}>
          This project allows for the creation of a prescription
          <br /> <br /> To get started, select a button from the menu bar above.
        </p>
      </div>
    );
  }
}

export default Greeting;
