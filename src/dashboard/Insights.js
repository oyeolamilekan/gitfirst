import React, { Component } from "react";

import Navigation from "./Nav";

class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username")
    };
  }
  render() {
    return <Navigation current="Customer Insights" />;
  }
}

export default Insights;