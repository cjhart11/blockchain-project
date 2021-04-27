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

class TopBar extends Component {
  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Green" }}>
          <Menu.Item>
            <Link to={{ pathname: "/" }}>
              <Button primary>Main Page</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <AddPrescription />
          </Menu.Item>
          <Menu.Item>
            <Link to={{ pathname: "/myPrescriptionInventory" }}>
              <Button primary>Show My Prescriptions</Button>
            </Link>
          </Menu.Item>
            <Menu.Item>
                <Link to={{ pathname: "/PrescriptionInventory" }}>
                    <Button primary>Show All Prescriptions</Button>
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
