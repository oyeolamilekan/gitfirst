import React, { Component } from "react";

import Navigation from "./Nav";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username")
    };
  }
  render() {
    return <Navigation current="Invoice" />;
  }
}

export default Invoice;