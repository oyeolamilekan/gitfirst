import { Redirect, Route } from "react-router-dom";

import React from "react";

function formatPrice(cents) {
  return (cents / 1).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN"
  });
}

function delimitNumbers(str) {
  return (str.replace(/,/g, '') + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('username')
      ? <Component {...props} />
      : <Redirect to={`/login?redirect=${props.location.pathname}`}/>
  )} />
)

const Token = () => {
  const token = localStorage.getItem('token')
  return token
}

export { PrivateRoute, formatPrice, Token, delimitNumbers };
