import { Redirect, Route } from "react-router-dom";

import React from "react";

function formatPrice(cents) {
  return (cents / 1).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN"
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

export { PrivateRoute, formatPrice, Token };
