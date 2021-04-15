import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import PrescriptionCardContent from "./prescriptionCardContent";

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

    if (this.props.myOwner)
      // Owner prescription: render card and tooltip and modal for prescription actions

      return (
        <Card style={{ backgroundColor: "LightGreen" }} raised>
          <ReactTooltip delayShow={400} />

          <a
            href="javascript:;"
            data-tip="Click on me to view actions for this prescription"
            onClick={e => this.modalOpen(e)}
          >
            <PrescriptionCardContent prescription={this.props} />
          </a>

          {/* a modal is like an "alert", it's a popup that greys out the lower screen and displays its content on top of everything */}

          <Modal open={this.state.modalOpen} onClose={this.handleClose}>
            <Header
              icon="browser"
              content="The choices for this prescription"
            />
            <Modal.Actions>
              <Button color="red" onClick={this.handleClose} inverted>
                <Icon name="cancel" /> Close
              </Button>
            </Modal.Actions>
          </Modal>
        </Card>
      );

    else
      return (
        <Card style={{ backgroundColor: "LavenderBlush" }}>
          <PrescriptionCardContent prescription={this.props} />
        </Card>
      );
  }
}

export default PrescriptionCard;
