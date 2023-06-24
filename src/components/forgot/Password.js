import React from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite/no-important";
import Button from "@material-ui/core/Button";
import SnackbarHandler from "../utils/SnackbarHandler";
import TextField from "@material-ui/core/TextField";
import * as Models from "./Models";
import CircularProgress from "@material-ui/core/CircularProgress";
const queryString = require("query-string");

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "60vh",
  },
  containerMobile: {
    padding: "12px 16px 6px 16px !important",
  },
  itemContainer: {
    marginLeft: -32,
    marginRight: -32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 10,
    paddingTop: 10,
    maxHeight: 22,
    borderBottom: "1px solid #DFE0EB",
    ":last-child": {
      borderBottom: "none",
    },
  },
  itemContainerMobile: {
    marginLeft: -16,
    marginRight: -16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  link: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.2px",
    color: "#163979",
    textAlign: "right",
    cursor: "pointer",
  },
  subtitle: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.1px",
    color: "#9FA2B4",
  },
  subtitle2: {
    color: "#252733",
    marginLeft: 2,
  },
  title: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    color: "#252733",
  },
  addButton: {
    backgroundColor: "#F0F1F7",
    color: "#9FA2B4",
    fontSize: 20,
    padding: 7,
  },
  itemTitle: {
    color: "#252733",
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: "0.2px",
    lineHeight: "20px",
  },
  itemValue: {
    color: "#9FA2B4",
  },
  greyTitle: {
    color: "#C5C7CD",
  },
  tagStyles: {
    borderRadius: 5,
    cursor: "pointer",
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 11,
    letterSpacing: "0.5px",
    lineHeight: "14px",
    padding: "5px 12px 5px 12px",
    width: "150px",
  },

  checkboxWrapper: {
    cursor: "pointer",
    marginRight: 16,
  },
});

class Support extends React.Component {
  renderItem(item, index) {
    return (
      <Column
        flexGrow={1}
        className={css(styles.itemContainer)}
        key={`item-${index}`}
        breakpoints={{ 426: css(styles.itemContainerMobile) }}
      >
        {item}
      </Column>
    );
  }
  state = {
    data: [],
    showThankYou: false,
    email: "",
    token: "",
  };
  componentDidMount = () => {
    let search = window.location.search;
    let token = search.substring(search.indexOf("token=") + 6, search.indexOf("&email"));
    let email = queryString.parse(window.location.search).email;

    this.setState({ token, email });
  };

  handleChangePassword = async () => {
    this.setState({ loading: true });
    let { data, token, password } = this.state;
    if (!data["newpassword"]) {
      this.setState({ errorsRequiredNew: true });
    }
    if (!data["newpassword-confirm"]) {
      this.setState({ errorsRequiredConfirm: true });
    }
    if (
      data["newpassword"] &&
      data["newpassword-confirm"] &&
      data["newpassword"] === data["newpassword-confirm"]
    ) {
      const { user, services, institution, mode } = this.props;

      let response = await Models.postForm({
        services,
        token,
        password: data["newpassword"],
      });

      if (response) {
        if (response.error) {
          this.setState({ loading: false }, () => {});
          this.handleAlertOpen(
            `Something went wrong! Invalid or expired reset password link.`,
            "error"
          );
        } else {
          this.setState({ errors: false, errorsMessage: "", showThankYou: true, loading: false });
          // this.handleAlertOpen(`Password Updated!`, "success");

          // setTimeout(
          //   () => this.setState({ loading: false }, () => {}),

          //   1000
          // );
        }
      }
    } else if (data["newpassword"] && data["newpassword-confirm"]) {
      this.setState({ errors: true, errorsMessage: "Passwords must match", loading: false });
    }
  };

  handleAlertOpen(message, type) {
    this.setState({
      alertOpen: true,
      alertMessage: message,
      alertType: type,
      errors: false,
      errorsMessage: "",
    });
  }

  onChange = (e) => {
    let data = this.state.data;

    data[e.target.name] = e.target.value;
    let obj = {};
    if (data["newpassword"]) {
      obj.errorsRequiredNew = false;
    }
    if (data["newpassword-confirm"]) {
      obj.errorsRequiredConfirm = false;
    }
    if (data["newpassword"] === data["newpassword-confirm"]) {
      obj.errors = false;
      obj.errorsMessage = "";
    }

    if (
      data["newpassword"] &&
      data["newpassword-confirm"] &&
      data["newpassword"] !== data["newpassword-confirm"]
    ) {
      obj.errors = true;
      obj.errorsMessage = "Passwords must match";
    }

    this.setState({ data, ...obj });
  };
  render() {
    const { title, link, subtitle, subtitleTwo, items, containerStyles, user } = this.props;
    let { showThankYou, email, data, loading } = this.state;

    return (
      <>
        <SnackbarHandler
          open={this.state.alertOpen}
          message={this.state.alertMessage}
          type={this.state.alertType}
          closeAlert={() => this.setState({ alertOpen: false })}
        />
        {loading ? (
          <div className="spinner-div-fullwidth-gray">
            <div className="spinner-circle">
              <CircularProgress />
            </div>
            <div className="spinner-text"></div>
          </div>
        ) : (
          <Column
            flexGrow={1}
            className={css(styles.container, containerStyles)}
            breakpoints={{ 426: css(styles.containerMobile) }}
          >
            <Row horizontal="space-between">
              <Column></Column>
            </Row>
            <Row style={{ height: 400, justifyContent: "center" }}>
              <Column flexGrow={0.5} style={{ marginRight: 10 }}>
                {showThankYou ? (
                  <>
                    <Row className="recovrr-logo-wrapper">
                      <a href="https://recovrr.org" target="_blank">
                        <img className="recovrr-logo" src="../recovrr_logo.png" alt="Recovrr" />
                      </a>
                    </Row>
                    <Row className="thank-you">
                      Your password has been successfully updated! <br />
                      <br />
                      You could now head over to the Recovrr iOS App to login.
                      <br />
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        type="password"
                        className={"std-button-primary std-button-primary-long"}
                        onClick={() => {
                          window.location.href = "recovrr://";
                        }}
                      >
                        LOGIN
                      </Button>
                    </Row>
                  </>
                ) : (
                  <React.Fragment>
                    <Row className="recovrr-logo-wrapper">
                      <a href="https://recovrr.org" target="_blank">
                        <img className="recovrr-logo" src="../recovrr_logo.png" alt="Recovrr" />
                      </a>
                    </Row>
                    <Row className="formRow">
                      <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={email}
                        disabled={true}
                        onChange={this.onChange}
                        inputProps={{
                          autoComplete: "new-password",
                          form: {
                            autocomplete: "off",
                          },
                        }}
                      />
                    </Row>
                    <Row className="formRow">
                      <TextField
                        error={this.state.errorsRequiredNew}
                        name="newpassword"
                        variant="outlined"
                        label="New Password"
                        type="password"
                        inputProps={{
                          autoComplete: "new-password",
                          form: {
                            autoComplete: "off",
                          },
                        }}
                        onChange={this.onChange}
                      />
                    </Row>
                    <Row className="formRow">
                      <TextField
                        error={this.state.errors || this.state.errorsRequiredConfirm}
                        name="newpassword-confirm"
                        helperText={this.state.errorsMessage}
                        variant="outlined"
                        type="password"
                        label="Confirm New Password"
                        inputProps={{
                          autoComplete: "new-password",
                          form: {
                            autoComplete: "off",
                          },
                        }}
                        onChange={this.onChange}
                      />
                    </Row>
                    <Row className="formButtonRow">
                      <Button
                        disabled={
                          this.state.errors ||
                          this.state.errorsRequiredNew ||
                          this.state.errorsRequiredConfirm ||
                          !data["newpassword-confirm"] ||
                          !data["newpassword"]
                        }
                        variant="contained"
                        color="primary"
                        type="password"
                        className={"std-button-primary std-button-primary-long"}
                        onClick={this.handleChangePassword}
                      >
                        Change Password
                      </Button>
                    </Row>
                  </React.Fragment>
                )}
              </Column>
            </Row>
          </Column>
        )}
      </>
    );
  }
}

export default Support;
