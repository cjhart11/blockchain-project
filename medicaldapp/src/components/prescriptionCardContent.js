import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import logo from '../images/medicaldrugicon.jpg';

class PrescriptionCardContent extends Component {
  truncate = (text, startChars, endChars) => {
    if (text.length > 12) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      return start + "..." + end;
    }
    return text;
  };

  render() {
  let shipDate = new Date(0);
  shipDate.setSeconds(this.props.prescription.prescriptionShipDate);
  let timeString = shipDate.toString().substr(0, 25);
  let ownerString = this.props.prescription.prescriptionOwner.substr(0,10) + "......" + this.props.prescription.prescriptionOwner.substr(30,this.props.prescription.prescriptionOwner.length);
    return (
      <Card.Content>
        <Card.Header>
          Prescription Name: <b>{this.props.prescription.prescriptionName.toString()}</b>
        </Card.Header>
        <Card.Description>
          Quantity: {this.props.prescription.prescriptionQuantity.toString()} <br />
          ShipDate: {timeString} <br />
          Origin: {this.props.prescription.prescriptionOrigin} <br />
          Destination: {this.props.prescription.prescriptionDestination} <br />
          Status: {this.props.prescription.prescriptionStatus} <br />
          Owner: {ownerString} <br />
        </Card.Description>
      </Card.Content>
    );
  }
}
export default PrescriptionCardContent;
