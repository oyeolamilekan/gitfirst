import React, { Component } from "react";
import { Token, formatPrice } from "../../helpers/utils";

import Moment from "react-moment";
import Navigation from "../Nav";
import axios from "axios";
import url from "../../url";

// Type	Amount	Balance Before	Balance After	Detail	Date
class BalanceHis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: [],
      isNext: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    axios
      .get(`${url}/api/r_get_balance_history/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          balance: res.data.results,
          isNext: res.data.next ? res.data.next.replace(url, "") : ""
        });
      });
  }

  handleClick() {
    const { isNext } = this.state;
    let next = `${url}${isNext}`;
    if (next !== null) {
      axios
        .get(next, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token()}`
          }
        })
        .then(response => {
          const { balance } = this.state;
          let resultss = balance;
          const newbalances = resultss.concat(response.data.results);
          next =
            response.data.next === null
              ? ""
              : response.data.next.replace(url, "");
          this.setState({
            balance: newbalances,
            isNext: next
          });
        });
    }
  }

  detailPush(id) {
    const { push } = this.props.history;
    push({
      pathname: "/transaction-detail",
      state: { idCode: id }
    });
  }

  render() {
    const { balance, isNext } = this.state;
    return (
      <div className="empt">
        <Navigation current="History" />
        <div className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <br />
          <br />
          <div className="mt-4">
            <div className="bg-white p-3 shadow rounded">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Balance Before</th>
                      <th>Balance After</th>
                      <th>Detail</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balance.map((item, key) => (
                     
                     <tr
                     key={key + item.balance_type + item.id}
                        className="tr-hover"
                        onClick={
                          item.balance_type === "In"
                            ? () => this.detailPush(item.detail)
                            : null
                        }
                      >
                        <td key={key + item.balance_type + item.id}>
                          {item.balance_type === "In" ? (
                            <i className="fa fa-arrow-down text-success" />
                          ) : (
                            <i className="fa fa-arrow-up text-danger" />
                          )}
                          {item.balance_type}
                        </td>
                        <td key={key + item.amount + 'Amount' + item.id}>
                          {formatPrice(item.amount)}
                        </td>
                        <td key={key + item.balance_before + 'before' + item.id}>
                          {formatPrice(item.balance_before)}
                        </td>
                        <td key={key + "btn" + item.id + item.balance_after}>
                          {formatPrice(item.balance_after)}
                        </td>
                        <td key={key + item.detail + item.id}>
                          {item.balance_type === "In"
                            ? "Transaction " + item.detail
                            : "Widrawal"}
                        </td>
                        <td key={key + 'Time' +item.date_added}>
                          <Moment format={"YYYY-MM-DD - dddd - hh:mm A"}>
                            {item.date_added}
                          </Moment>
                        </td>
                        <td key={key + item.shop_name}>{item.shop_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center">
                {isNext ? (
                  <span
                    className="btn btn-outline-dark btn-sm"
                    onClick={this.handleClick}
                  >
                    More
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BalanceHis;
