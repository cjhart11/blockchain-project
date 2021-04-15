import React, { Component } from "react";
//import getZombieCount from "../utils/getZombieCount";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";

function mapStateToProps(state) {
    return {
        CZ: state.CZ,
        userAddress: state.userAddress,
        userItemCount: state.userItemCount
    };
}


class CreatePrescription extends Component {
  state = {
    modalOpen: false,
    name: "",
    quantity: "",
    message: "",
    errorMessage: "",
    loading: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.createPrescription(this.state.name, this.state.quantity)
      this.setState({
        loading: false,
        message: "You have created a prescription"
      });
      //getZombieCount(this.props.CZ, this.props.userAddress);
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "User rejected transaction or else this account is already in use, please try another name."
      });
    }
  };


  render() {
    let createDisabled = (this.props.userItemCount !== 0);
      return (
      <Modal
        trigger={
          <Button primary disabled={createDisabled} onClick={this.handleOpen}>
            Add Item
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="Add a new Item" />
        <Modal.Content>
          <img src="static/images/medical-drug-icon.jpg" alt="pill icon" /><Header>Be sure to give all of the information</Header>
          <br /> <br />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Prescription Name</label>
              <input
                placeholder="Name"
                onChange={event =>
                  this.setState({
                    value: event.target.value
                  })
                }
              />
              <label>Quantity</label>
              <input
                placeholder="Quantity"
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
              Create Zombie
            </Button>
            <hr />
            <h2>{this.state.message}</h2>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleClose} inverted>
            <Icon name="cancel" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(CreatePrescription);