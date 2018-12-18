import "../Special.css";

import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

// import Progress from "react-progress-2";
// import "react-progress-2/main.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username")
    };
    this.logout = this.logout.bind(this);
  }
  getNavLinkClass = (path) => {
    return this.props.location.pathname === path ? 'active' : '';
  }
  logout(event) {
    event.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    this.props.history.push("/logout");

  }
  render() {
    const { username } = this.state;
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-white flex-md-nowrap p-0 mb-2">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0 d-none d-md-block color-success border-none" href="/">
            {username}
          </a>
          <ul className="navbar-nav mr-auto pl-2 d-md-block">
            <li className="nav-item text-muted">{this.props.current}</li>
          </ul>
          <ul className="navbar-nav p-1 px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link text-muted" onClick={this.logout} href="/#">
                Sign out
              </a>
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light border-white sidebar">
              <div className="sidebar-sticky">
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>YOUR BUSINESS</span>
                  <a className="d-flex align-items-center text-muted" href="/#">
                    <span data-feather="plus-circle" />
                  </a>
                </h6>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/dashboard"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fas fa-home" />
                      <span className="ml-1" />
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/transaction"
                      className={`nav-link ${this.getNavLinkClass("/transaction-detail")}`}
                      activeClassName="active"
                    >
                      <i className="far fa-window-maximize" />
                      <span className="ml-1" />
                      Transactions
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/payouts"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fa fa-wallet" />
                      <span className="ml-1" />
                      Payouts
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/balancehistory"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fa fa-folder" />
                      <span className="ml-1" />
                      Balance History
                    </NavLink>
                  </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>YOUR CUSTOMERS</span>
                  <a className="d-flex align-items-center text-muted" href="/#">
                    <span data-feather="plus-circle" />
                  </a>
                </h6>
                <ul className="nav flex-column mb-2">
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/customers"
                      className={`nav-link ${this.getNavLinkClass("/customer-detail")}`}
                      activeClassName="active"
                    >
                      <i className="fa fa-users" />
                      <span className="ml-1" />
                      Customers
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/insights"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fa fa-chart-pie" />
                      <span className="ml-1" />
                      Insights
                    </NavLink>
                  </li>
                </ul>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>YOUR PAGE</span>
                  <a className="d-flex align-items-center text-muted" href="/#">
                    <span data-feather="plus-circle" />
                  </a>
                </h6>
                <ul className="nav flex-column mb-2">
                  <li>
                    <NavLink
                      exact
                      to="/paymentpage"
                      className={`nav-link ${this.getNavLinkClass("/payment-page-detail")}`}
                      activeClassName="active"
                    >
                      <i className="fa fa-box-open" />
                      <span className="ml-1" />
                      Payment Page
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/invoice"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fa fa-file-invoice" />
                      <span className="ml-1" />
                      Invoice
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
            
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);