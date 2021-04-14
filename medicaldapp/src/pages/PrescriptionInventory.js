import React, { Component } from "react";
import {
  Card,
  Grid,
  Input,
  Segment,
  Pagination,
} from "semantic-ui-react";
import { connect } from "react-redux";

import PrescriptionCard from "../components/prescriptionCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    totalPrescriptionCount: state.totalPrescriptionCount,
    userAddress: state.userAddress
  };
}

class PrescriptionInventory extends Component {
  state = {
    PrescriptionTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.totalPrescriptionCount / 9)
  };

  componentDidMount = async () => {
    await this.makePrescriptionCards();
  };

  onChange = async (e, pageInfo) => {
    await this.setState({ activePage: pageInfo.activePage });
    this.makePrescriptionCards();
  };

  handleInputChange = async (e, { value }) => {
      await this.setState({ activePage: value });
      this.makePrescriptionCards();
  }

  makePrescriptionCards = async () => {
    let zList = [];
    let zOwner = [];
    await this.setState({ prescriptionTable: [] }); // clear screen while waiting for data
    for (
      let i = this.state.activePage * 9 - 9;
      i < this.state.activePage * 9;
      i++
    ) {
      try {
        let metaData = await this.props.CZ.prescriptions(i);
        zList.push(metaData);
        let myOwner = await this.props.CZ.prescriptionToOwner(i);
        zOwner.push(myOwner);
      } catch (err) {
        break;
      }
    }

    let prescriptionTable = [];
    for (let i = 0; i < zList.length; i++) {
      let myDate = new Date(zList[i].readyTime * 1000).toLocaleString();
      let prescription = zList[i];
        prescriptionTable.push(
          <PrescriptionCard
            prescriptionName={prescription.name}
            prescriptionQuantity={prescription.quantity}
            prescriptionShipDate={prescription.shipDate}
            prescriptionOrigin={prescription.origin}
            prescriptionDestination={prescription.destination}
            prescriptionStatus={prescription.status}
            prescriptionOwner={this.props.userAddress}
            myOwner={true}
          />
        );
    }
    this.setState({ prescriptionTable });
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Complete Prescription Inventory </h2>
        <hr />
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Segment secondary>
              <div>activePage: {this.state.activePage}</div>
              <Input
                min={1}
                max={this.state.totalPages}
                onChange={this.handleInputChange}
                type="range"
                value={this.state.activePage}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Pagination
              activePage={this.state.activePage}
              onPageChange={this.onChange}
              totalPages={this.state.totalPages}
            />
          </Grid.Column>
        </Grid>
        <br /> <br />
        <div>
          <Card.Group>{this.state.prescriptionTable}</Card.Group>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PrescriptionInventory);
