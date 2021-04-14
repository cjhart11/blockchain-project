import React, { Component } from "react";
import { Card } from "semantic-ui-react";

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
    return (
      <Card.Content>
        <Card.Header>
          Prescription Name: <b>{this.props.prescription.name}</b>
        </Card.Header>
        <Card.Description>
          Quantity: {this.props.prescription.prescriptionQuantity} <br />
          ShipDate: {this.props.prescription.shipDate} <br />
          Origin: {this.props.prescription.origin} <br />
          Destination: {this.props.prescription.destination} <br />
          Status: {this.props.prescription.status} <br />
          Owner: {this.props.userAddress} <br />
        </Card.Description>
      </Card.Content>
    );
  }
}
export default PrescriptionCardContent;
