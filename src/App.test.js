import App from "./App";
import BalanceHis from "./dashboard/balance/BalanceHis";
import { BrowserRouter } from "react-router-dom";
import CustomerDetail from "./dashboard/customers/CustomerDetail";
import Customers from "./dashboard/customers/Customers";
import HomePage from "./dashboard/Home";
import Index from "./dashboard";
import Insights from "./dashboard/Insights";
import Invoice from "./dashboard/Invoice";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Nav from "./dashboard/Nav";
import NewPaymentPage from "./dashboard/NewPayments";
import Pay from "./payment/payPage";
import PayDt from "./payment/payDt";
import PayementDetail from "./dashboard/payments/DetailPage";
import PaymentPage from "./dashboard/payments/PaymentPage";
import Payout from "./dashboard/Payouts";
import React from "react";
import ReactDOM from "react-dom";
import SignUp from "./auth/SignUp";
import TransD from "./dashboard/transactions/DetailTran";
import Transaction from "./dashboard/transactions/Transaction";

it("App component", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Payment page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Pay match={{ params: "cool" }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Paydetail component", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <PayDt location={{ state: { email: "kiii", amount: 30 } }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Sign up", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Log in", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Log out", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Logout />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Home page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Index page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Navigation Page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Payout page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Payout />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("New Payment Detail", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <PayementDetail location={{ state: "looking-for-you" }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("New page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <NewPaymentPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Payment page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <PaymentPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Transaction list", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Transaction />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Transacton Detail", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <TransD location={{ state: "dami" }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Invoice", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Invoice />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Insights", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Insights />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Customer List", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Customers />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Customer Detail", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <CustomerDetail location={{ state: "hello" }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Customer Detail", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <BalanceHis />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
