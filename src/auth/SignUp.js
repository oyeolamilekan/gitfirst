import React, { Component } from "react";

import { Link } from "react-router-dom";
import Loading from "react-spinners/BeatLoader";
import axios from "axios";
import strip from "../logo_pits.png";
import url from "../url";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      error: false,
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDismiss(event) {
    event.preventDefault();
    this.setState({
      error: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username } = this.state;
    const { email } = this.state;
    const { password1 } = this.state;
    const { password2 } = this.state;
    this.setState({
      loading: true
    });
    axios
      .post(`${url}/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        this.props.history.push("/dashboard");
      })
      .catch(er => {
        const err = er.response.data;
        if (err.username) {
          this.setState({
            loading: false,
            error: true,
            errorMessage: "A user with that username already exists."
          });
        } else if (err.email) {
          this.setState({
            loading: false,
            error: true,
            errorMessage:
              "A user is already registered with this e-mail address."
          });
        } else if (err.non_field_errors) {
          this.setState({
            loading: false,
            error: true,
            errorMessage: "The two password fields didn't match."
          });
        } else {
          this.setState({
            loading: false,
            error: true,
            errorMessage: `${JSON.stringify(
              err.response.data.non_field_errors
            )} ${JSON.stringify(err.email[0])} ${JSON.stringify(
              err.username[0]
            )} `
          });
        }
      });
  }
  render() {
    const { error } = this.state;
    const { errorMessage } = this.state;
    const { loading } = this.state;
    return (
      <div className="col-md-6 offset-md-3">
        <div className="container mt-4 bg-white p-4 shadow rounded">
          <div className="img-container text-center">
            <img src={strip} className="reg-img" alt="logo" />
          </div>
          <div className="mt-4" />
          <div className="login-container">
            {error["username"]}
            {error}
            {error ? (
              <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {errorMessage}
                <button
                  type="button"
                  className="close"
                  onClick={this.handleDismiss}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : (
              ""
            )}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="InputUsername"
                  aria-describedby="helpUsername"
                  placeholder="Username"
                  onChange={this.handleChange}
                  name="username"
                  required="true"
                />
              </div>
              <div className="mt-4" />
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  required="true"
                  onChange={this.handleChange}
                />
              </div>
              <div className="mt-4" />
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword1"
                  placeholder="Password"
                  name="password1"
                  required="true"
                  onChange={this.handleChange}
                />
              </div>
              <div className="mt-4" />
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword2"
                  placeholder="Enter Password again"
                  name="password2"
                  required="true"
                  onChange={this.handleChange}
                />
              </div>
              <div className="mt-4" />
              <div className="btn-submit">
                <button
                  type="submit"
                  className="btn btn-block p-3 bg-nice text-white"
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <span className="spinner">
                      <Loading
                        color={"white"}
                        sizeUnit={"px"}
                        size={13}
                        className={"spinner-logo"}
                      />
                    </span>
                  ) : (
                    <div className="login-text">Create My Account</div>
                  )}
                </button>
              </div>
              <div className="text-center mt-2">
                Already have an account? <Link to="/login" className="text-dark">Login in</Link>
              </div>
              <div className="mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
