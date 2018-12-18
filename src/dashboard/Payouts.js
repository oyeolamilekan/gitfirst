import React, { Component } from "react";

import { BeatLoader } from "react-spinners";
import Navigation from "./Nav";
import { Spring } from "react-spring";
import { Token } from "../helpers/utils";
import axios from "axios";
import { formatPrice } from "../helpers/utils";
import url from "../url";

class Payout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_info: "",
      pinHolder: "",
      pin: "",
      loading: false,
      pinAccess: false,
      success: false,
      failed: false
    };
    this.confirmCode = this.confirmCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Imediately excute when the component
  // Mounts
  componentDidMount() {
    axios
      .get(`${url}/api/r_withdraw_balance/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          customer_info: res.data
        });
      });
  }

  // This function calls the api
  // that create the confirmations
  // token that would be used
  // to confirm the transaction
  confirmCode(event) {
    event.preventDefault();
    this.setState({
      loading: true
    });
    axios
      .get(`${url}/api/r_get_access_code/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(response => {
        this.setState({
          loading: false,
          pinAccess: true,
          pinHolder: response.data.holder
        });
      });
  }

  // Handles the value input
  // And changes the state in other
  // To send the value to the server
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Submits the form data to the API
  // And does no animation :(
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const { pin } = this.state;
    axios
      .post(
        `${url}/api/r_confirm_code/`,
        {
          pin: pin
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token()}`
          }
        }
      )
      .then(res => {
        this.setState({
          success: true,
          loading: false,
          pinAccess: false
        });
      })
      .catch(error => {
        console.log("erro");
        this.setState({
          failed: true,
          loading: false,
          pinAccess: false
        });
      });
  }

  render() {
    const {
      customer_info,
      loading,
      pinAccess,
      success,
      failed,
      pinHolder
    } = this.state;
    return (
      <div>
        <Navigation current="Payout" />
        <br />
        <br />
        <div className="col-md-9 ml-sm-auto col-lg-10 px-4 bg-white mt-1">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom p-2">
            <div className="btn-toolbar mb-2 mb-md-0">Withdraw money</div>
            <a
              href="/#"
              className="btn btn-sm color-success text-white"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Withdraw
            </a>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-tile text-center" id="exampleModalLabel">
                  <span className="text-center font-weight-light">
                    Withdrawal
                  </span>
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                {loading ? (
                  <div className="text-center m-4">
                    <BeatLoader />
                  </div>
                ) : pinAccess ? (
                  <Spring
                    from={{ opacity: 0, marginTop: -800 }}
                    to={{ opacity: 1, marginTop: 0 }}
                  >
                    {props => (
                      <div className="App" style={props}>
                        <p>Type the confirmation code {pinHolder}</p>

                        <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control text-center"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="PIN"
                              name="pin"
                              onChange={this.handleChange}
                              required
                            />
                            <div className="btn-container mt-3">
                              <button
                                type="button"
                                className="btn btn-light float-left"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary float-right"
                              >
                                Process
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </Spring>
                ) : success ? (
                  <Spring
                    from={{ opacity: 0, marginTop: -1000 }}
                    to={{ opacity: 1, marginTop: 0 }}
                  >
                    {props => (
                      <div className="parent" style={props}>
                        <div className="text-center mb-2">
                          <div className="text-center">
                            <span className="fa-stack fa-2x">
                              <i className="fas fa-circle fa-stack-2x icon-background9" />
                              <i className="fas fa-check fa-stack-1x fa-inverse" />
                            </span>
                            <h3 className="font-weight-light mt-3">
                              Payment successfully processed
                            </h3>
                            <p className="font-weight-light">
                              You will soon recieve a bank alert
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Spring>
                ) : failed ? (
                  <Spring
                    from={{ opacity: 0, marginTop: -5000 }}
                    to={{ opacity: 1, marginTop: 0 }}
                  >
                    {props => (
                      <div className="parent" style={props}>
                        <div className="text-center mb-2">
                          <div className="text-center">
                            <span className="fa-stack fa-2x">
                              <i className="fas fa-circle fa-stack-2x icon-background6" />
                              <i className="fas fa-times fa-stack-1x fa-inverse" />
                            </span>
                            <h3 className="font-weight-light mt-3">
                              Payment failed
                            </h3>
                            <p className="font-weight-light">
                              Kindly check your internet connection, or you
                              mistyped the token.
                            </p>
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              onClick={this.confirmCode}
                            >
                              Try Again
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Spring>
                ) : (
                  <Spring
                    from={{ opacity: 0, marginTop: -1000 }}
                    to={{ opacity: 1, marginTop: 0 }}
                  >
                    {props => (
                      <div className="engine-2" style={props}>
                        <div className="engine">
                          <span>
                            Do you want withdraw{" "}
                            {formatPrice(customer_info.balance_acc)} ?
                          </span>
                          <br />
                          <br />
                          {parseFloat(customer_info.balance_acc) > 0.0 ? (
                            <a
                              href="/#"
                              className="btn btn-lg color-success btn-block text-white"
                              onClick={this.confirmCode}
                            >
                              Proceed
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )}
                  </Spring>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payout;
