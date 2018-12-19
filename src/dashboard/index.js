import React, { Component } from "react";
import { Token, formatPrice } from "../helpers/utils";

import { BeatLoader } from "react-spinners";
import { Line } from "react-chartjs-2";
import Navigation from "./Nav";
import axios from "axios";
import url from "../url";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      days: [],
      loading: true,
      data_set: []
    };
  }
  componentDidMount() {
    console.log(Token())
    axios
      .get(`${url}/api/r_get_account_bal/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res =>
        this.setState({
          info: res.data.user_info,
          days: res.data.days,
          data_set: res.data.data_set,
          loading: false
        })
      );
  }
  render() {
    const { info, days, data_set, loading } = this.state;
    return (
      <div className="equals">
        <Navigation current="Dashboard" />
        <div className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <br />
          <br />

          <div className="mt-4">
            <div className="row">
              <div className="col-lg-3">
                <div className="card border-white shadow mb-2">
                  <div className="card-body">
                    <div className="d-flex no-block">
                      <div className="mr-1 align-self-center">
                        <span className="fa-stack fa-2x">
                          <i className="fas fa-circle fa-stack-2x icon-background4" />
                          <i className="fas fa-users fa-stack-1x fa-inverse" />
                        </span>
                      </div>
                      <div className="align-self-center mt-2">
                        <h6 className="f-14 text-muted"> Total Customers</h6>
                        <h6 className="font-weight-light">{info.total_customers}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card border-white shadow mb-2">
                  <div className="card-body">
                    <div className="d-flex no-block">
                      <div className="mr-1 align-self-center">
                        <span className="fa-stack fa-2x">
                          <i className="fas fa-circle fa-stack-2x icon-background2" />
                          <i className="fas fa-money-bill-alt fa-stack-1x fa-inverse" />
                        </span>
                      </div>
                      <div className="align-self-center mt-2">
                        <h6 className="f-14 text-muted"> Total Income</h6>
                        <h6 className="font-weight-light">{formatPrice(info.total_income)}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="card border-white shadow mb-2">
                  <div className="card-body">
                    <div className="d-flex no-block">
                      <div className="mr-1 align-self-center">
                        <span className="fa-stack fa-2x">
                          <i className="fas fa-circle fa-stack-2x icon-background5" />
                          <i className="fas fa-wallet fa-stack-1x fa-inverse" />
                        </span>
                      </div>
                      <div className="align-self-center mt-2">
                        <h6 className="f-14 text-muted"> Total Sales</h6>
                        <h6 className="font-weight-light">{info.total_sales}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="card border-white shadow mb-2">
                  <div className="card-body">
                    <div className="d-flex no-block">
                      <div className="mr-1 align-self-center">
                        <span className="fa-stack fa-2x">
                          <i className="fas fa-circle fa-stack-2x icon-background3" />
                          <i className="fas fa-file-alt fa-stack-1x fa-inverse" />
                        </span>
                      </div>
                      <div className="align-self-center mt-2">
                        <h6 className="f-14 text-muted">
                          {" "}
                          Withdrawals
                        </h6>
                        <h6 className="font-weight-light">{info.total_withdraws}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 shadow rounded">
              {loading ? (
                <div className="text-center">
                  <BeatLoader />
                </div>
              ) : (
                <div className="def-container">
                  <h2 className="font-weight-light text-center">
                    {formatPrice(info.balance_acc)}
                  </h2>
                  <Line
                    data={{
                      labels: days,
                      datasets: [
                        {
                          label: "Sales",
                          data: data_set,
                          backgroundColor: "#fafff9",
                          borderColor: "#28a745"
                        }
                      ]
                    }}
                    width={100}
                    height={45}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
