import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import BalanceHis from "./dashboard/balance/BalanceHis";
import CustomerDetail from "./dashboard/customers/CustomerDetail";
import Customers from "./dashboard/customers/Customers";
import HomePage from "./dashboard/Home";
import Index from "./dashboard";
import Insights from "./dashboard/Insights";
import Invoice from "./dashboard/Invoice";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import NewPaymentPage from "./dashboard/NewPayments";
import Pay from "./payment/payPage";
import PayPt from "./payment/payDt";
import PayementDetail from "./dashboard/payments/DetailPage";
import PaymentPage from "./dashboard/payments/PaymentPage";
import Payout from "./dashboard/Payouts";
import { PrivateRoute } from "./helpers/utils";
import SignUp from "./auth/SignUp";
import TransD from "./dashboard/transactions/DetailTran";
import Transaction from "./dashboard/transactions/Transaction";

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/paypage/:id" component={Pay} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={SignUp} />
        <Route path="/pay" component={PayPt} />
        <PrivateRoute path="/dashboard" component={Index} />
        <PrivateRoute path="/customer-detail" component={CustomerDetail} />
        <PrivateRoute path="/transaction" component={Transaction} />
        <PrivateRoute path="/payouts" component={Payout} />
        <PrivateRoute path="/balancehistory" component={BalanceHis} />
        <PrivateRoute path="/invoice" component={Invoice} />
        <PrivateRoute path="/insights" component={Insights} />
        <PrivateRoute path="/customers" component={Customers} />
        <PrivateRoute path='/transaction-detail' component={TransD} />
        <PrivateRoute path="/paymentpage/create" component={NewPaymentPage} />
        <PrivateRoute path="/paymentpage" component={PaymentPage} />
        <PrivateRoute path="/payment-page-detail" component={PayementDetail} />
      </Switch>
    );
  }
}

export default Main;
