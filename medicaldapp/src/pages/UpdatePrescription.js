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
    name: "",
    quantity: null,
    origin: "",
    destination: "",
    status: "",
    message: "",
    errorMessage: "",
    loadingName: false,
    loadingQuant: false,
    loadingOrigin: false,
    loadingDestination: false,
    loadingStatus: false,
    prescriptionId: null
  };


  async componentDidMount() {
    let prescriptionId = this.props.location.state.prescriptionId;
    this.setState({
      prescriptionId
    });
  }

  onSubmitName = async event => {
    event.preventDefault();
    this.setState({
      loadingName: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.updatePrescriptionName(this.state.prescriptionId, this.state.name)
      this.setState({
        loadingName: false,
        message: "You have updated your prescription's name."
      });
    } catch (err) {
      this.setState({
        loadingName: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  onSubmitQuantity = async event => {
    event.preventDefault();
    this.setState({
      loadingQuant: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.updatePrescriptionQuantity(this.state.prescriptionId, this.state.quantity)
      this.setState({
        loadingQuant: false,
        message: "You have updated your prescription's quantity."
      });
    } catch (err) {
      this.setState({
        loadingQuant: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  onSubmitOrigin = async event => {
    event.preventDefault();
    this.setState({
      loadingOrigin: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.updatePrescriptionOrigin(this.state.prescriptionId, this.state.origin)
      this.setState({
        loadingOrigin: false,
        message: "You have updated your prescription's origin."
      });
    } catch (err) {
      this.setState({
        loadingOrigin: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  onSubmitDestination = async event => {
    event.preventDefault();
    this.setState({
      loadingDestination: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.updatePrescriptionDestination(this.state.prescriptionId, this.state.destination)
      this.setState({
        loadingDestination: false,
        message: "You have updated your prescription's destination."
      });
    } catch (err) {
      this.setState({
        loadingDestination: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  onSubmitStatus = async event => {
    event.preventDefault();
    this.setState({
      loadingStatus: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.updatePrescriptionStatus(this.state.prescriptionId, this.state.status)
      this.setState({
        loadingStatus: false,
        message: "You have updated your prescription's status."
      });
    } catch (err) {
      this.setState({
        loadingStatus: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  render() {
      console.log("the value we got: "+this.props.location.state.prescriptionQuantity);
    return (
      <div>
        <Header icon="browser" content="Update prescription information." />
        <table>
          <tr>
            <th>
                <PrescriptionCard
                    prescriptionId={this.props.location.state.prescriptionId}
                    prescriptionName={this.props.location.state.prescriptionName}
                    prescriptionQuantity={this.props.location.state.prescriptionQuantity}
                    prescriptionShipDate={this.props.location.state.prescriptionShipDate}
                    prescriptionOrigin={this.props.location.state.prescriptionOrigin}
                    prescriptionDestination={this.props.location.state.prescriptionDestination}
                    prescriptionStatus={this.props.location.state.prescriptionStatus}
                    prescriptionOwner={this.props.userAddress}
                    myOwner={false}
                />
            </th>
          </tr>
        </table>
        <br />
        <Form onSubmit={this.onSubmitName} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Prescription Name</label>
            <input
              placeholder="Name"
              onChange={event =>
                this.setState({
                  name: event.target.value
                })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loading}>
            <Icon name="check" />
            Change Name
          </Button>
          <hr />
        </Form>
        <Form onSubmit={this.onSubmitQuantity} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Prescription Quantity</label>
            <input
                placeholder="Quantity"
                onChange={event =>
                    this.setState({
                      quantity: event.target.value
                    })
                }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loadingQuant}>
            <Icon name="check" />
            Change Quantity
          </Button>
          <hr />
        </Form>
        <Form onSubmit={this.onSubmitOrigin} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Prescription Origin</label>
            <input
                placeholder="Origin"
                onChange={event =>
                    this.setState({
                      origin: event.target.value
                    })
                }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loadingOrigin}>
            <Icon name="check" />
            Change Origin
          </Button>
          <hr />
        </Form>
        <Form onSubmit={this.onSubmitDestination} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Prescription Destination</label>
            <input
                placeholder="Destination"
                onChange={event =>
                    this.setState({
                      destination: event.target.value
                    })
                }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loadingDestination}>
            <Icon name="check" />
            Change Destination
          </Button>
          <hr />
        </Form>
        <Form onSubmit={this.onSubmitStatus} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Prescription Status</label>
            <input
                placeholder="Status"
                onChange={event =>
                    this.setState({
                      status: event.target.value
                    })
                }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loadingStatus}>
            <Icon name="check" />
            Change Status
          </Button>
          <hr />
        </Form>
        <h2>{this.state.message}</h2>
        <Link to={{pathname: "/"}}>
          <Button color="red" inverted>
            <Icon name="cancel" /> Close
          </Button>
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UpdatePrescription);