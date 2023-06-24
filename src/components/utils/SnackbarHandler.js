import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const INITIAL_STATE = {
  alertOpen: false,
};

export default class SnackbarHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  componentDidMount() {
    if (this.props.open === true) {
      this.setState({ alertOpen: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.open !== prevProps.open && this.props.open === true) {
      this.setState({ alertOpen: this.props.open });
    }
  }

  handleAlertClose() {
    this.setState({ alertOpen: false });
    this.props.closeAlert();
  }
  renderAlert() {
    switch (this.props.type) {
      case "success":
        return (
          <Alert onClose={() => this.handleAlertClose()} severity="success">
            {this.props.message}
          </Alert>
        );
      case "warning":
        return (
          <Alert onClose={() => this.handleAlertClose()} severity="warning">
            {this.props.message}
          </Alert>
        );
      case "error":
        return (
          <Alert onClose={() => this.handleAlertClose()} severity="error">
            {this.props.message}
          </Alert>
        );
      case "support":
        return (
          <Alert
            // onClose={() => this.handleAlertClose()}
            severity="error"
            action={
              <>
                <Button color="inherit" size="small" onClick={() => this.props.logout()}>
                  Logout
                </Button>
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => (window.location.href = "mailto:admin@recovrr.com")}
                >
                  Get Help
                </Button>
              </>
            }
          >
            {this.props.message}
          </Alert>
        );
      case "information":
        return (
          <Alert onClose={() => this.handleAlertClose()} severity="info">
            {this.props.message}
          </Alert>
        );

      default:
        break;
    }

    return;
  }
  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.alertOpen}
          autoHideDuration={this.props.duration ? this.props.duration : 3000}
          onClose={() => this.handleAlertClose()}
        >
          {this.renderAlert()}
        </Snackbar>
      </div>
    );
  }
}
