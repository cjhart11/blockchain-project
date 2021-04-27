import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import PrescriptionCardContent from "./prescriptionCardContent";
import {Link} from "react-router-dom";

class PrescriptionCard extends Component {
  state = {
    modalOpen: false
  };

  modalOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose = () => this.setState({ modalOpen: false });

  truncate = (text, startChars, endChars) => {
    if (text.length > 12) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      return start + "..." + end;
    }
    return text;
  };

  render() {
    // define the button labels used in <ActionButton> further on down in the code

    // create the JSX depending on whether you own the Prescription or not

    const changePrescriptionButton = (
        <div>
          Change Prescription <br />
        </div>
    );

    if (this.props.myOwner) {
      // Owner prescription: render card and tooltip and modal for prescription actions

      return (
          <Card style={{backgroundColor: "LightGreen"}}
                href="javascript:;"
                data-tip="Click on me to view actions for this prescription"
                onClick={e => this.modalOpen(e)}>
            <ReactTooltip delayShow={400}/>
            <PrescriptionCardContent prescription={this.props}/>
            {/* a modal is like an "alert", it's a popup that greys out the lower screen and displays its content on top of everything */}

            <Modal open={this.state.modalOpen} onClose={this.handleClose}>
              <Header
                  icon="browser"
                  content="Options for this prescription"
              />
              <Modal.Actions>
                <ActionButton
                    pathname="/UpdatePrescription"
                    buttonLabel={changePrescriptionButton}
                    data={this.props}
                />
                <Button color="red" onClick={this.handleClose} inverted>
                  <Icon name="cancel"/> Close
                </Button>
              </Modal.Actions>
            </Modal>
          </Card>
      );
    }
    else {
      return (
          <Card style={{backgroundColor: "LavenderBlush"}}>
            <PrescriptionCardContent prescription={this.props}/>
          </Card>
      );
    }
  }
}

export default PrescriptionCard;
