//
// This is the "Change Prescription" page
//

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header, Icon, Form, Message } from "semantic-ui-react";
import PrescriptionCard from "../components/prescriptionCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userAddress: state.userAddress
  };
}

class UpdatePrescription extends Component {
  state = {
    value: "",
    message: "",
    errorMessage: "",
    loading: false,
    prescriptionId: null
  };


  async componentDidMount() {
    let prescriptionId = this.props.location.state.prescriptionId;
    this.setState({
      prescriptionId
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.updatePrescriptionName(this.state.prescriptionId, this.state.value)
      this.setState({
        loading: false,
        message: "You have updated your prescription's name."
      });
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  render() {
      let shipDate = new Date(0);
      shipDate.setSeconds(this.props.location.prescriptionShipDate);
      let timeString = shipDate.toString().substr(0, 25);
      let ownerString = this.props.userAddress.substr(0,10) + "......" + this.props.userAddress.substr(30,this.props.userAddress.length);
      console.log("get the value: " + this.props.location.state.quantity);
    return (
      <div>
        *<Header icon="browser" content="Please give me a WORTHY name!!" />
        <table>
          <tr>
            <th>
                <PrescriptionCard
                    prescriptionId={this.props.location.state.prescriptionId}
                    prescriptionName={this.props.location.state.prescriptionName}
                    prescriptionQuantity={this.props.location.state.prescriptionQuantity}
                    prescriptionShipDate={timeString}
                    prescriptionOrigin={this.props.location.state.prescriptionOrigin}
                    prescriptionDestination={this.props.location.state.prescriptionDestination}
                    prescriptionStatus={this.props.location.state.prescriptionStatus}
                    prescriptionOwner={ownerString}
                    myOwner={false}
                />
            </th>
            <th>
              <img src="static/images/nametag.jpg" alt="name tag" />
            </th>
          </tr>
        </table>
        <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Prescription Name</label>
            <input
              placeholder="Name"
              onChange={event =>
                this.setState({
                  value: event.target.value
                })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loading}>
            <Icon name="check" />
            Change Name
          </Button>
          <Link to="/MyZombieInventory">
            <Button color="red" inverted>
              <Icon name="cancel" /> Close
            </Button>
          </Link>
          <hr />
          <h2>{this.state.message}</h2>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UpdatePrescription);