import React, { Component } from "react";
import {
  Card,
  Grid,
  Input,
  Segment,
  Pagination, Form, Message, Button, Icon, Dropdown
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
    totalPages: Math.ceil(this.props.totalPrescriptionCount / 9),
    choices: [
      { label: "ID", value: "ID" },
      { label: "Name", value: "Name" },
      { label: "Quantity", value: "Quantity" },
      { label: "Ship Date", value: "Ship Date" },
      { label: "Origin", value: "Origin" },
      { label: "Destination", value: "Destination" },
      { label: "Status", value: "Status" },
      { label: "Owner", value: "Owner" }],
    searchValue: null,
    selectedChoice: ""
  };

  componentDidMount = async () => {
    await this.makePrescriptionCards();
  };

  handleFilterChange = async (e) => {
    await this.setState({selectedChoice: e.target.value});
    this.makePrescriptionCards();
  }

  handleSearchChange = async (e) => {
    await this.setState({searchValue: e.target.value});
    this.makePrescriptionCards();
  }

  onChange = async (e, pageInfo) => {
    await this.setState({ activePage: pageInfo.activePage });
    this.makePrescriptionCards();
  };

  handleInputChange = async (e, { value }) => {
      await this.setState({ activePage: value });
      this.makePrescriptionCards();
  }

  prescriptionSearch(prescription) {
    if (this.state.searchValue === null){
      return true;
    }
    if (this.state.selectedChoice === "ID"){
      if (prescription.pid.toString().toUpperCase().includes(this.state.searchValue.toUpperCase())){
        return true;
      }
    }
    if (this.state.selectedChoice === "Name"){
      if (prescription.name.toString().toUpperCase().includes(this.state.searchValue.toUpperCase())){
        return true;
      }
    }
    if (this.state.selectedChoice === "Quantity"){
      if (prescription.quantity.toString() === this.state.searchValue){
        return true;
      }
    }
    if (this.state.selectedChoice === "Ship Date"){
      let shipDate = new Date(0);
      shipDate.setSeconds(prescription.shipDate);
      let timeString = shipDate.toString().substr(0, 25);
      if (timeString.toUpperCase().includes(this.state.searchValue.toUpperCase())){
        return true;
      }
    }
    if (this.state.selectedChoice === "Origin"){
      if (prescription.origin.toString().toUpperCase().includes(this.state.searchValue.toUpperCase())){
        return true;
      }
    }
    if (this.state.selectedChoice === "Destination"){
      if (prescription.destination.toString().toUpperCase().includes(this.state.searchValue.toUpperCase())){
        return true;
      }
    }
    if (this.state.selectedChoice === "Status"){
      if (prescription.status.toString().toUpperCase().includes(this.state.searchValue.toUpperCase())){
        return true;
      }
    }
    if (this.state.selectedChoice === "Owner"){
      if (prescription.owner.toString() === this.state.searchValue){
        return true;
      }
    }
    return false;
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
      if (this.prescriptionSearch(prescription)){
        prescriptionTable.push(
            <PrescriptionCard
                prescriptionId={prescription.pid}
                prescriptionName={prescription.name}
                prescriptionQuantity={parseInt(prescription.quantity)}
                prescriptionShipDate={prescription.shipDate}
                prescriptionOrigin={prescription.origin}
                prescriptionDestination={prescription.destination}
                prescriptionStatus={prescription.status}
                prescriptionOwner={prescription.owner.toString()}
                myOwner={this.props.userAddress === zOwner[i]}
            />
        );
      }

    }
    this.setState({ prescriptionTable });
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Search Entire Prescription Inventory </h2>
        <h2>
          <Form>
            <Form.Field>
              <input
                  placeholder="Search"
                  onChange={this.handleSearchChange}
              />
            </Form.Field>
            <select onChange={this.handleFilterChange}>
              <option value = "select search criteria"> -- Select a search criteria --</option>
              {this.state.choices.map((choice) => <option value ={choice.value}>{choice.label}</option>)}
            </select>
          </Form>
        </h2>
        <hr />
        <br /> <br />
        <div>
          <Card.Group>{this.state.prescriptionTable}</Card.Group>
        </div>
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
      </div>
    );
  }


}

export default connect(mapStateToProps)(PrescriptionInventory);
