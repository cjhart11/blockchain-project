import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Create an action button with link

class ActionButton extends Component {
  // format long names and addresses into xxxx...xxxx form

  truncate = (text, startChars, endChars) => {
    if (text.length > 12) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      return start + "..." + end;
    }
    return text;
  };

  render() {
    const prescriptionData = {
      prescriptionName: this.truncate(this.props.data.prescriptionName, 8, 8),
      prescriptionId: this.props.data.prescriptionId,
      PrescriptionQuantity: this.props.data.prescriptionQuantity,
      prescriptionShipDate: this.props.data.prescriptionShipDate,
      prescriptionOwner: this.props.data.prescriptionOwner,
      prescriptionOrigin: this.props.data.prescriptionOrigin,
      prescriptionDestination: this.props.data.prescriptionDestination,
      prescriptionStatus: this.props.data.prescriptionStatus
    };

    const pathName = this.props.pathname;
    const buttonLabel = this.props.buttonLabel;

    //console.log("button label", this.props.buttonLabel, pathName, prescriptionData);
    return (
      <Link
        to={{
          pathname:  pathName ,
          state:  prescriptionData
        }}
      >
        <Button primary disabled={this.props.disableMe}> {buttonLabel} </Button>
      </Link>
    );
  }
}

export default ActionButton;
