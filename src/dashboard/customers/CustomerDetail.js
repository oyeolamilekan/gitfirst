import React, { Component } from "react";
import { Token, formatPrice } from "../../helpers/utils";

import { BeatLoader } from "react-spinners";
import Moment from "react-moment";
import Navigation from "../Nav";
import axios from "axios";
import url from "../../url";

class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_detail: "",
      customer_trans: [],
      loading: true
    };
  }

  componentDidMount() {
    const { idCode } = this.props.location.state;
    axios
      .get(`${url}/api/r_get_customer_detail/`, {
        params: {
          idCode: idCode
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          customer_detail: res.data.customer_detail,
          customer_trans: res.data.trans_rel_list,
          loading: false
        });
      });
  }
  render() {
    const { customer_detail, customer_trans, loading } = this.state;
    return (
      <div className="maria-par">
        <Navigation current="detail" />
        <div className="col-md-10 ml-sm-auto col-lg-10 px-4 mb-1">
          <br />
          <br />
          <br />
          <div className="bg-white rounded shadow">
            {!loading ? (
              <div>
                <div className="container">
                  <div className="row full-height">
                    <div className="col border-right">
                      <div className="transaction-d mt-4 p-4">
                        <h5 className="text-muted font-weight-light">
                          Customer Name
                        </h5>
                        <div className="price-container">
                          <span className="text-muted price-container h5">
                            {customer_detail.customer_name}
                          </span>
                        </div>
                        <br />
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Status
                          </span>
                          <span className="float-right">
                            <div className="p-1 bg-success rounded text-white">
                              Active
                            </div>
                          </span>
                        </div>
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Transaction Processed
                          </span>
                          <span className="float-right text-muted font-weight-bold">
                            {customer_detail.customer_count}
                          </span>
                        </div>
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Customer Code
                          </span>
                          <span className="float-right text-muted font-weight-bold">
                            {customer_detail.customer_code}
                          </span>
                        </div>
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Customer Id
                          </span>
                          <span className="float-right text-muted font-weight-bold">
                            {customer_detail.customer_id}
                          </span>
                        </div>
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Total Spent
                          </span>
                          <span className="float-right text-muted font-weight-bold">
                            {formatPrice(customer_detail.total_amount_spent)}
                          </span>
                        </div>
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Created At
                          </span>
                          <span className="float-right text-muted font-weight-bold">
                            <Moment format={"MMM DD, ddd - hh:mm A, YYYY."}>
                              {customer_detail.customer_date_added}
                            </Moment>
                          </span>
                        </div>
                        <hr />
                      </div>
                    </div>
                    <div className="col">
                      <div className="transaction-d mt-4 p-4">
                        <h5 className="text-muted text-center font-weight-light">
                          Recent Transaction
                        </h5>
                        <br />
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Status</th>
                                <th>Transaction</th>
                              </tr>
                            </thead>
                            <tbody>
                              {customer_trans.map((item, key) => (
                                <tr className="tr-hover">
                                  <td key={key + "btn"}>
                                    <span className="bg-success p-1 rounded text-white">
                                      Success
                                    </span>
                                  </td>
                                  <td key={key + item.amount}>
                                    {" "}
                                    <b>{formatPrice(`${item.amount}`)}</b>{" "}
                                    <Moment
                                      format={"YYYY-MM-DD - dddd - hh:mm A"}
                                    >
                                      {item.date_added}
                                    </Moment>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-5 p-3">
                <span className="mt-2" />
                <BeatLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerDetail;
