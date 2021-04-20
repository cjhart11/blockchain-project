import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import PrescriptionCard from "../components/prescriptionCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userPrescriptionCount: state.userPrescriptionCount,
    userAddress: state.userAddress
  };
}

class MyPrescriptionInventory extends Component {
  state = {
    PrescriptionTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.userPrescriptionCount / 9)
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
  };
  makePrescriptionCards = async () => {
    const myPrescriptions = await this.props.CZ.getPrescriptionsByOwner(this.props.userAddress);
    console.log("Getting Prescriptions by owner");
    let loopi = 0;
    while (loopi < myPrescriptions.length){
        console.log(myPrescriptions[loopi]);
        loopi++;
    }
    let prescriptionTable = [];
    for (
      var i = this.state.activePage * 9 - 9;
      i < this.state.activePage * 9;
      i++
    ) {
      try {
        let z = myPrescriptions[i];
        let prescription = await this.props.CZ.prescriptions(z);
        //let myDate = new Date(prescription.readyTime * 1000).toLocaleString();
        console.log(prescription);
        prescriptionTable.push(
          <PrescriptionCard
            key={z}
            prescriptionId={prescription.pid}
            prescriptionName={prescription.name}
            prescriptionQuantity={prescription.quantity}
            prescriptionShipDate={prescription.shipDate}
            prescriptionOrigin={prescription.origin}
            prescriptionDestination={prescription.destination}
            prescriptionStatus={prescription.status}
            prescriptionOwner={prescription.owner}
            myOwner={true}
          />
        );
      } catch {
        break;
      }
    }
    this.setState({ prescriptionTable });
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Your prescription Inventory </h2>
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
        <Card.Group> {this.state.prescriptionTable} </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MyPrescriptionInventory);
