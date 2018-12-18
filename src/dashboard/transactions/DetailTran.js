import React, { Component } from "react";
import { Token, formatPrice } from "../../helpers/utils";

import Moment from "react-moment";
import Navigation from "../Nav";
import axios from "axios";
import url from "../../url";

class TransD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      customer_detail: ""
    };
  }
  componentDidMount() {
    const { idCode } = this.props.location.state;
    axios
      .get(`${url}/api/r_get_transaction_detail/`, {
        params: {
          idCode: idCode,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          customer_detail: res.data.trans_detail
        });
      });
  }
  render() {
    const { customer_detail } = this.state;
    return (
      <div className="maria-par">
        <Navigation current="detail" />
        <div className="col-md-10 ml-sm-auto col-lg-10 px-4 mb-1">
          <br />
          <br />
          <br />
          <div className="bg-white rounded shadow">
            <div className="container">
              <div className="row full-height">
                <div className="col border-right">
                  <div className="transaction-d mt-4 p-4">
                    <h5 className="text-muted font-weight-light">Amount</h5>
                    <div className="price-container">
                      <span className="text-muted price-container h5">
                        {formatPrice(customer_detail.amount)}
                      </span>
                      <span className="float-right bg-success text-white rounded p-1">
                        Success
                      </span>
                    </div>
                    <br />
                    <hr />
                    <div className="list-group-item-in pt-3 pb-3 h6">
                      <span className="text-muted price-container">
                        Reference
                      </span>
                      <span className="float-right text-muted font-weight-bold">
                        {customer_detail.ref_code}
                      </span>
                    </div>
                    <hr />
                    <div className="list-group-item-in pt-3 pb-3 h6">
                      <span className="text-muted price-container">
                        Shop Name
                      </span>
                      <span className="float-right text-muted font-weight-bold">
                        {customer_detail.shop_name}
                      </span>
                    </div>
                    <hr />
                    <div className="list-group-item-in pt-3 pb-3 h6">
                      <span className="text-muted price-container">
                        Customer Name
                      </span>
                      <span className="float-right text-muted font-weight-bold">
                        {customer_detail.customer_name}
                      </span>
                    </div>
                    <hr />
                    <div className="list-group-item-in pt-3 pb-3 h6">
                      <span className="text-muted price-container">
                        Customer Email
                      </span>
                      <span className="float-right text-muted font-weight-bold">
                        {customer_detail.customer_email}
                      </span>
                    </div>
                    <hr />
                    <div className="list-group-item-in pt-3 pb-3 h6">
                      <span className="text-muted price-container">
                        Paid At
                      </span>
                      <span className="float-right text-muted font-weight-bold">
                        <Moment format={"MMM DD, ddd - hh:mm A, YYYY."}>
                          {customer_detail.date_added}
                        </Moment>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="transaction-d mt-4 p-4">
                    <h5 className="text-muted text-center font-weight-light">
                      Action
                    </h5>
                    <div className="email-container mt-2">
                      <div className="p-5 border rounded text-center">
                        <span className="h5 font-weight-light">
                          {customer_detail.customer_email}
                        </span>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col">
                        <a
                          href="mailto:someone@example.com?Subject=Hello%20again&body=hello sir"
                          className="btn btn-outline-dark btn-block"
                        >
                          Send Message
                        </a>
                      </div>
                      <div className="col">
                        <a href="/#" className="btn btn-primary btn-block">
                          Send Discount
                        </a>
                      </div>
                    </div>
                    <hr />
                    <div className="border-left">
                      <div className="step-container">
                        <div className="step">
                          <div>
                            <div className="circle" />
                          </div>
                          <div>
                            <div className="title">Filled Info</div>
                          </div>
                          <div>
                            <div className="title">01:20</div>
                          </div>
                        </div>
                        <div className="step step-active">
                          <div>
                            <div className="circle" />
                          </div>
                          <div>
                            <div className="title">Paid</div>
                          </div>
                          <div>
                            <div className="title">00:20</div>
                          </div>
                        </div>
                        <div className="step step-active">
                          <div>
                            <div className="circle" />
                          </div>
                          <div>
                            <div className="title">Done</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransD;
