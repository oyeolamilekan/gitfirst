import { NavLink } from "react-router-dom";
import React from "react";
import image from "../perfect.png";
import logo from "../logo_pits.png";

const HomePage = () => (
  <div className="page">
    <nav className="navbar navbar-expand-lg navbar-light bg-white h-25">
      <a className="" href="/#">
        <img src={logo} alt="logo" className="logo" style={{ width: "55px" }} />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul className="navbar-nav mr-auto mt-3 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="/#">
              Our Solution
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              Learn
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              Product
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              Demo
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto mt-3 mt-lg-0 ml-4">
          {localStorage.getItem("username") ? (
            <li className="nav-item">
              <NavLink to="/dashboard" className="btn bg-nice text-white">
                Dashboard
              </NavLink>
            </li>
          ) : (
            <div className="marker">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <div className="ml-2" />
              <li className="nav-item">
                <NavLink to="/signup" className="btn bg-nice text-white">
                  Creat Account
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
    <div className="section-main sect p-5">
      <div className="container text-white text-center">
        <h1 className="b text-center mt-5">
          {" "}
          <b>Accept payments everywhere</b>
        </h1>
        <p className="font-weight-light mt-3 text-center">
          Experience a simple payments platform that grows your business from
          day one.
        </p>
        <a href="/#" className="btn btn-dark btn-lg">
          Create Account
        </a>
      </div>
    </div>
    <div className="expalination-section mt-4 p-3">
      <div className="container">
        <h4 className="text-center h-underline">Do more with vinepay</h4>
        <p className="mt-4 text-center">
          Everything designed to simplify payments so you can focus on building
          a successful business.
        </p>
        <br />
        <br />
        <div className="row">
          <div className="col-md-4">
            <div>
              <span className="fa-stack fa-2x">
                <i className="fas fa-circle fa-stack-2x icon-background1" />
                <i className="fas fa-credit-card fa-stack-1x fa-inverse" />
              </span>
              <h5 className="mt-2">Reliable Payments</h5>
              <p className="mt-2">
                Create beautiful invoices and accept payments within seconds on
                highly realiable payment infrastructures.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <span className="fa-stack fa-2x">
                <i className="fas fa-circle fa-stack-2x icon-background8" />
                <i className="fas fa-globe fa-stack-1x fa-inverse" />
              </span>
              <h5 className="mt-2">Go Global</h5>
              <p className="mt-2">
                Grow your business, go global, accept payments from anyone,
                anywhere and at anytime around the world.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <span className="fa-stack fa-2x">
                <i className="fas fa-circle fa-stack-2x icon-background6" />
                <i className="fas fa-lock fa-stack-1x fa-inverse" />
              </span>
              <h5 className="mt-2">Fraud Protection and Security</h5>
              <p className="mt-2">
                Highest level of data encryption built in with tools employed to
                protect you against fraud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="expalination-section mt-5 p-3 bg-white">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2>Accept Multiple Payment Methods</h2>
            <p>
              Grow your business, go global, and boost transaction success rates
              by giving your customers multiple choice of payment.
            </p>
            <p>
              You don't need a rock star programmer to use vinepay, just create
              a shop and start accepting payment. Voila!!
            </p>
            <p>
              Use leading technology that adapts to any business, store,
              industry, or shopper journey. You'll enjoy flexible features to
              fit your business with a single integration, and some customers
              have reported a risk-adjusted ROI of 106%, according to our 2018
              Forrester report.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={image}
              className="img-fluid rounded shadow"
              alt="payment container"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="contact-sales sect p-5">
      <div className="text-center mtt">
        <h3>Want to learn more?</h3>
        <div className="mt-3" />
        <a href="/#" className="btn bg-darker text-white ml-2">
          Contact Sales
        </a>{" "}
        <a href="/#" className="text-dark">
          Newsletter Sign up
        </a>
      </div>
    </div>
    <footer className="fdb-block text-white footer-large bg-darker">
      <div className="container pt-5">
        <div className="row align-items-top text-center text-md-left">
          <div className="col-12 col-sm-6 col-md-4">
            <strong className="h5">Why Vinepay</strong>

            <ul className="list-unstyled mt-2">
              <li className="mt-2">Why choose Vinepay</li>
              <li className="mt-2">Success Rate</li>
            </ul>
            <ul className="list-unstyled mt-2">
              <li className="mt-2">For Small businesses</li>
              <li className="mt-2">For Organizations</li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-md-4 mt-4 mt-sm-0">
            <strong className="h5">Address</strong>
            <p className="mt-2">
              Street Address 100
              <br />
              >Contact Name
            </p>
            <p>+234 816 0540 083</p>
            <p>
              <a href="/#">hello@vinepay.com</a>
            </p>
          </div>

          <div className="col-12 col-md-4 mt-5 mt-md-0 text-md-left">
            <strong className="h5">About Vinepay</strong>
            <p className="mt-2">
              Vinepay is the easiest way to accept payments and make instant
              payouts for smart businesses in Nigeria.
            </p>
          </div>
        </div>

        <div className="row mt-5 pb-3">
          <div className="col text-center">
            © 2018 Vinecode Sys. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default HomePage;
