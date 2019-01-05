import React, { Component } from "react";

import Axios from "axios";
//import the library
import PaystackButton from "react-paystack";
import { formatPrice } from "../helpers/utils";
import url from "../url";

class PayPt extends Component {
  state = {
    key: "pk_test_key", //PAYSTACK PUBLIC KEY
    email: this.props.location.state.email, // customer email
    amount: parseInt(`${this.props.location.state.amount}00`), //equals NGN100,
    successBtn: false
  };

  callback = response => {
    const { reference } = response; // card charged successfully, get reference here
    const { customername, email, amount, id } = this.props.location.state;
    Axios.post(`${url}/api/r_create_transactions/`, {
      customer_name: customername,
      customer_email: email,
      ref_code: reference,
      id: id,
      amount: amount
    }).then(res => {
      this.setState({
        successBtn: true
      });
    });
  };

  close = () => {
    console.log("Payment closed");
  };

  getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  render() {
    const { customername, amount, shopName } = this.props.location.state;
    const { successBtn } = this.state;
    return (
      <div className="col-md-6 offset-md-3 mt-4">
        <div className="p-4 bg-white mt-2 shadow rounded">
          <p>
            {" "}
            Do you <b>{customername}</b> approve the payment of{" "}
            <b>{formatPrice(`${amount}`)}</b> to this merchant <b>{shopName}</b>?
          </p>
          {!successBtn ? (
            <PaystackButton
              text="Make Payment"
              class="payButton btn btn-lg btn-block color-success text-white"
              callback={this.callback}
              close={this.close}
              disabled={false} //disable payment button
              embed={false} //payment embed in your app instead of a pop up
              reference={this.getReference()}
              email={this.state.email}
              amount={this.state.amount}
              paystackkey={this.state.key}
            />
          ) : (
            <div className="btn color-success btn-lg color-success btn-block text-white">
              Send reciept
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PayPt;
