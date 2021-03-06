import React, { Component } from "react";

import Moment from "react-moment";
import Navigation from "../Nav";
import { Token } from "../../helpers/utils";
import axios from "axios";
import url from "../../url";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isNext: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    let next = `${url}${this.state.isNext}`;
    if (next !== null) {
      axios
        .get(next, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token()}`
          }
        })
        .then(response => {
          let resultss = this.state.customers;
          let newcustomers = resultss.concat(response.data.results);
          let next =
            response.data.next === null
              ? ""
              : response.data.next.replace(url, "");
          this.setState({
            customers: newcustomers,
            isNext: next
          });
        });
    }
  }
  componentDidMount() {
    axios
      .get(`${url}/api/r_get_customer_list/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          customers: res.data.results,
          isNext: res.data.next ? res.data.next.replace(url, "") : ""
        });
      });
  }
  detailPush(id) {
    this.props.history.push({
      pathname: "/customer-detail",
      state: { idCode: id }
    });
  }
  render() {
    const { customers, isNext } = this.state;
    return (
      <div>
        <Navigation current="Transaction" />
        <div className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <br />
          <br />

          <div className="mt-4">
            <div className="bg-white p-3 shadow rounded">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Purchase count</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((item, key) => (
                      <tr
                        className="tr-hover"
                        key={key + item.customer_name + item.customer_email}
                        onClick={() => this.detailPush(item.id)}
                      >
                        <td key={key + item.customer_name}>
                          {item.customer_name}
                        </td>
                        <td key={key + item.customer_email}>
                          {item.customer_email}
                        </td>
                        <td key={key + "btn"}>
                          <span className="bg-success p-1 rounded text-white">
                            Active
                          </span>
                        </td>
                        <td key={key + item.customer_count} className="text-center">
                          <span>
                          {item.customer_count}
                          </span>
                        </td>
                        <td key={key + item.date_added}>
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

export default Customers;
