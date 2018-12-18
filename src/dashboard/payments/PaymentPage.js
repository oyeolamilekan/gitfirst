import React, { Component } from "react";

import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
// import { Link, Route } from "react-router-dom";
import Moment from "react-moment";
import Navigation from "../Nav";
import { Token } from "../../helpers/utils";
import axios from "axios";
import url from "../../url";

// import NewPaymentPage from "./NewPayments";

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      isNext: "",
      shop_name: null,
      file: null,
      sent: false,
      loading: false,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reUpdate = this.reUpdate.bind(this);
    this.handleAnother = this.handleAnother.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  detailPush(id) {
    this.props.history.push({
      pathname: "/payment-page-detail",
      state: { idCode: id }
    });
  }
  reUpdate() {
    axios
      .get(`${url}/api/r_payment_page/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res =>
        this.setState({
          pages: res.data.results,
          isNext: res.data.next ? res.data.next.replace(url, "") : ""
        })
      );
  }

  componentDidMount() {
    this.reUpdate();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handelOnUploadFile = event => {
    this.setState({
      file: event.target.files
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    this.setState({
      loading: true
    });

    const { shop_name, file } = this.state;

    let data = new FormData();
    data.set("file", file[0]);
    data.set("shop_name", shop_name);
    axios.post(`${url}/api/r_create/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Token()}`
      }
    })
      .then(res => {
        this.setState({
          sent: true,
          loading: false
        });
        this.reUpdate();
      })
      .catch(error => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  handleAnother(event) {
    event.preventDefault();
    this.setState({
      sent: false
    });
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
          let resultss = this.state.pages;
          let newtransaction = resultss.concat(response.data.results);
          let next =
            response.data.next === null
              ? ""
              : response.data.next.replace(url, "");
          this.setState({
            pages: newtransaction,
            isNext: next
          });
        });
    }
  }

  render() {
    const { pages, isNext, loading, sent, error } = this.state;
    return (
      <div>
        <Navigation current="Pages" />
        <div className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <br />
          <br />

          <div className="mt-4">
            <div className="bg-white p-3 shadow rounded">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Shop id</th>
                      <th>Shop Name</th>
                      <th>Status</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((item, key) => (
                      <tr
                        key={key + item.owner_code + item.section_name}
                        className="tr-hover"
                        onClick={() => this.detailPush(item.id)}
                      >
                        <td key={key + item.owner_code}>{item.owner_code}</td>
                        <td key={key + item.section_name}>
                          {item.section_name}
                        </td>
                        <td key={key + "btn-success"}>
                          <span className="bg-success p-1 rounded text-white">
                            open
                          </span>
                        </td>
                        <td key={key + item.date_added}>
                          <Moment format={"YYYY-MM-DD - dddd - hh:mm A"}>
                            {item.date_added}
                          </Moment>
                        </td>
                        <td>
                          <Link
                            to={`/paypage/${item.owner_code}`}
                            target="_blank"
                          >
                            <i className="fa fa-link text-dark" />
                          </Link>
                        </td>
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
            <br />

            <a
              href="/#"
              className="float bg-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fa fa-plus my-float" />
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
                    New Payement Page
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
              <div className="modal-body">
                {loading ? (
                  <div className="text-center">
                    <BeatLoader size={40} />
                  </div>
                ) : sent ? (
                  <div className="text-center">
                    <h1>
                      <i className="fa fa-check text-success" />
                    </h1>
                    <br />
                    <h3 className="font-weight-light">
                      Shop successfully created
                    </h3>
                    <p className="font-weight-light">You are free to use it.</p>
                    <span
                      className="btn btn-light"
                      onClick={this.handleAnother}
                    >
                      Create Another
                    </span>
                  </div>
                ) : error ? (
                  <div className="text-center">
                    <h1>
                      <i className="fa fa-times text-danger" />
                    </h1>
                    <br />
                    <h5 className="font-weight-light">
                      Something bad happened
                    </h5>
                  </div>
                ) : (
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        <b>Shop Name</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Name of your shop"
                        onChange={this.handleChange}
                        name="shop_name"
                        required
                      />
                    </div>
                    <div>
                      <span className="pb-2">
                        <b>Image</b>
                      </span>

                      <p />
                      <input
                        type="file"
                        name="file"
                        id="file"
                        className="inputfile"
                        onChange={this.handelOnUploadFile}
                        required
                      />
                      <label htmlFor="file">Choose a file</label>
                    </div>
                    <br />
                    <br />
                    <div className="btn-container">
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
                        Save changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
              <div className="p-1 text-center">Powered by UnoCode</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentPage;
