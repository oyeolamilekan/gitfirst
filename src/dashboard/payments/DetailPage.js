import React, { Component } from "react";

import { BeatLoader } from "react-spinners";
import Moment from "react-moment";
import Navigation from "../Nav";
import { Token } from "../../helpers/utils";
import axios from "axios";
import url from "../../url";

class PayementDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop_detail: "",
      checked: false,
      loading: true
    };
    this._handleChange = this._handleChange.bind(this);
  }
  _handleChange() {
    const { idCode } = this.props.location.state;
    this.setState({
      checked: !this.state.checked
    });
    axios.post(
      `${url}/api/r_get_shop_action/`,
      { idCode: idCode },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      }
    );
  }
  componentDidMount() {
    const { idCode } = this.props.location.state;
    axios
      .get(`${url}/api/r_payment_page_detail/`, {
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
          shop_detail: res.data.shop_detail,
          checked: res.data.shop_detail.status_open,
          loading: false
        });
      });
  }
  render() {
    const { shop_detail, checked, loading } = this.state;
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
                          Shop Name
                        </h5>
                        <div className="price-container">
                          <span className="text-muted price-container h5">
                            {shop_detail.section_name}
                          </span>
                        </div>
                        <br />
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Status
                          </span>
                          <span className="float-right">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={this._handleChange}
                              />
                              <span className="slider round" />
                            </label>
                          </span>
                        </div>
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Transaction Processed
                          </span>
                          <span className="float-right text-muted font-weight-bold">
                            {shop_detail.tran_pro}
                          </span>
                        </div>
                        <hr />
                        <div className="list-group-item-in pt-3 pb-3 h6">
                          <span className="text-muted price-container">
                            Created At
                          </span>
                          <span className="float-right text-muted font-weight-bold">
                            <Moment format={"MMM DD, ddd - hh:mm A, YYYY."}>
                              {shop_detail.date_added}
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
                        <br />
                        <div className="row">
                          <div className="col">
                            <a
                              href="mailto:someone@example.com?Subject=Hello%20again&body=hello sir"
                              className="btn btn-outline-danger btn-block"
                            >
                              <i className="fa fa-trash" /> Delete
                            </a>
                          </div>
                          <div className="col">
                            <a href="/#" className="btn btn-primary btn-block">
                              <i className="fa fa-edit" /> Edit Page
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-5 p-3">
                <span className='mt-2'/>
                <BeatLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PayementDetail;
