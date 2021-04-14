import React, { Component } from "react";

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
        <h2 style={{ color: "DarkRed", textAlign: "center" }}>
          {" "}
          Welcome to Jon and Conors <b> Blockchain</b> project
        </h2>
        <br />
        <img src="static/images/medical-drug-icon.jpg" style={imgStyle} width="400px" alt="Medical icon" />
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
