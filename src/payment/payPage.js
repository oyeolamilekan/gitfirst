import "../Special.css";

import React, { Component } from "react";

import Loading from "react-spinners/BeatLoader";
import axios from "axios";
import strip from "../logo_pits.png";
import url from "../url";

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customername: "",
      email: "",
      amount: "",
      loading: true,
      shopName: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDismiss(event) {
    event.preventDefault();
    this.setState({
      error: false
    });
  }

  /// this.props.location.state;
  handleSubmit(event) {
    event.preventDefault();
    const { customername, email, amount } = this.state;
    const { id } = this.props.match.params;
    this.props.history.push({
      pathname: "/pay",
      state: {
        customername: customername,
        email: email,
        amount: amount,
        id: id
      }
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`${url}/api/r_validate_code/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: id
        }
      })
      .then(res => {
        const { status, shop_name } = res.data;
        if (status !== "ok") {
          this.setState({
            error: true,
            loading: false
          });
        } else {
          this.setState({
            loading: false,
            shopName: shop_name
          });
        }
      });
  }
  render() {
    const { loading, shopName, error } = this.state;
    return (
      <div className="col-md-6 offset-md-3">
        <div className="container mt-4 bg-white p-4 shadow rounded">
          {loading ? (
            <span className="spinner">
              <Loading
                color={"black"}
                sizeUnit={"px"}
                size={40}
                className={"spinner-logo text-center"}
              />
            </span>
          ) : !error ? (
            <div className="pay-container">
              <div className="img-container text-center">
                <img src={strip} className="reg-img" alt="logo" />
                <h2 className="font-weight-light">{shopName}</h2>
              </div>
              <div className="mt-4" />
              <div className="in-pay-container">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="InputUsername"
                      aria-describedby="helpUsername"
                      placeholder=" Customer Name"
                      onChange={this.handleChange}
                      name="customername"
                      required={true}
                    />
                  </div>
                  <div className="mt-4" />
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="InputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      required={true}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="mt-4" />
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      id="InputAmount"
                      aria-describedby="emailHelp"
                      placeholder="Enter Amount"
                      name="amount"
                      required={true}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="btn-submit">
                    <button
                      type="submit"
                      className="btn btn-block p-3 color-success text-white"
                      disabled={loading ? true : false}
                    >
                      {loading ? (
                        <span className="spinner">
                          <Loading
                            color={"black"}
                            sizeUnit={"px"}
                            size={13}
                            className={"spinner-logo"}
                          />
                        </span>
                      ) : (
                        <div className="login-text">Proceed to Checkout</div>
                      )}
                    </button>
                  </div>
                  <div className="mt-4" />
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="font-weight-light">
                ERROR, you are not supposed to be here.
              </h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Pay;
