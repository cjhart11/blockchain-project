import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

import AddPrescription from "./AddPrescription";

import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress,
    userPrescriptionCount: state.userPrescriptionCount,
    totalPrescriptionCount: state.totalPrescriptionCount
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {
  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
          <Menu.Item>
            <AddPrescription />
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/myPrescriptionInventory" }}>
              <Button primary>Show My Prescriptions</Button>
            </Link>
          </Menu.Item>
        </Menu>
        Your account address: {this.props.userAddress}
        <br />
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
